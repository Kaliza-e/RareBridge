import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { GoogleSheetsService } from '../google-sheets/google-sheets.service';
import { ValidationService } from '../validation/validation.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';

@Controller('diseases')
export class DiseaseController {
  constructor(
    private readonly diseaseService: DiseaseService,
    private readonly googleSheetsService: GoogleSheetsService,
    private readonly validationService: ValidationService
  ) {}

  @Post('import')
  async importFromSheets(@Body('spreadsheetId') spreadsheetId: string, @Body('range') range: string) {
    try {
      console.log('Importing from Google Sheets:', { spreadsheetId, range });
      const rawData = await this.googleSheetsService.importDiseases(spreadsheetId, range);
      console.log('Raw data received:', rawData.length, 'rows');
      
      const transformedData = this.validationService.transformGoogleSheetsData(rawData);
      console.log('Transformed data:', transformedData.length, 'diseases');
      
      const createdDiseases = [];
      const failedImports = [];
      
      for (const disease of transformedData) {
        const validation = this.validationService.validateDiseaseData(disease);
        
        if (validation.valid) {
          try {
            const created = await this.diseaseService.create(validation.sanitized);
            createdDiseases.push(created);
          } catch (error) {
            console.error('Failed to create disease:', disease.name, error);
            failedImports.push({ disease: disease.name, error: String(error) });
          }
        } else {
          console.error('Validation failed for disease:', disease.name, validation.errors);
          failedImports.push({ disease: disease.name, errors: validation.errors });
        }
      }
      
      return { 
        imported: createdDiseases.length, 
        failed: failedImports.length,
        diseases: createdDiseases,
        errors: failedImports
      };
    } catch (error) {
      console.error('Import failed:', error);
      throw error;
    }
  }

  @Post()
  create(@Body() createDiseaseDto: CreateDiseaseDto) {
    const validation = this.validationService.validateDiseaseData(createDiseaseDto);
    
    if (!validation.valid) {
      return { valid: false, errors: validation.errors };
    }
    
    return this.diseaseService.create(validation.sanitized);
  }

  @Get()
  findAll(@Query('search') search?: string, @Query('category') category?: string) {
    return this.diseaseService.findAll(search, category);
  }

  @Get('categories')
  getCategories() {
    return this.diseaseService.getCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diseaseService.findOne(id);
  }

  @Get('number/:diseaseNumber')
  findByDiseaseNumber(@Param('diseaseNumber') diseaseNumber: string) {
    return this.diseaseService.findByDiseaseNumber(diseaseNumber);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDiseaseDto: UpdateDiseaseDto) {
    return this.diseaseService.update(id, updateDiseaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diseaseService.remove(id);
  }
}
