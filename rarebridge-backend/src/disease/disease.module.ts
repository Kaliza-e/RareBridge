import { Module } from '@nestjs/common';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleSheetsModule } from '../google-sheets/google-sheets.module';
import { ValidationModule } from '../validation/validation.module';

@Module({
  imports: [PrismaModule, GoogleSheetsModule, ValidationModule],
  controllers: [DiseaseController],
  providers: [DiseaseService],
})
export class DiseaseModule {}