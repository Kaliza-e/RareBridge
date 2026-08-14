"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseController = void 0;
const common_1 = require("@nestjs/common");
const disease_service_1 = require("./disease.service");
const google_sheets_service_1 = require("../google-sheets/google-sheets.service");
const validation_service_1 = require("../validation/validation.service");
const create_disease_dto_1 = require("./dto/create-disease.dto");
const update_disease_dto_1 = require("./dto/update-disease.dto");
let DiseaseController = class DiseaseController {
    constructor(diseaseService, googleSheetsService, validationService) {
        this.diseaseService = diseaseService;
        this.googleSheetsService = googleSheetsService;
        this.validationService = validationService;
    }
    async importFromSheets(spreadsheetId, range) {
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
                    }
                    catch (error) {
                        console.error('Failed to create disease:', disease.name, error);
                        failedImports.push({ disease: disease.name, error: String(error) });
                    }
                }
                else {
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
        }
        catch (error) {
            console.error('Import failed:', error);
            throw error;
        }
    }
    create(createDiseaseDto) {
        const validation = this.validationService.validateDiseaseData(createDiseaseDto);
        if (!validation.valid) {
            return { valid: false, errors: validation.errors };
        }
        return this.diseaseService.create(validation.sanitized);
    }
    findAll(search, category) {
        return this.diseaseService.findAll(search, category);
    }
    getCategories() {
        return this.diseaseService.getCategories();
    }
    findOne(id) {
        return this.diseaseService.findOne(id);
    }
    findByDiseaseNumber(diseaseNumber) {
        return this.diseaseService.findByDiseaseNumber(diseaseNumber);
    }
    update(id, updateDiseaseDto) {
        return this.diseaseService.update(id, updateDiseaseDto);
    }
    remove(id) {
        return this.diseaseService.remove(id);
    }
};
exports.DiseaseController = DiseaseController;
__decorate([
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)('spreadsheetId')),
    __param(1, (0, common_1.Body)('range')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DiseaseController.prototype, "importFromSheets", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_disease_dto_1.CreateDiseaseDto]),
    __metadata("design:returntype", void 0)
], DiseaseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DiseaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiseaseController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiseaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('number/:diseaseNumber'),
    __param(0, (0, common_1.Param)('diseaseNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiseaseController.prototype, "findByDiseaseNumber", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_disease_dto_1.UpdateDiseaseDto]),
    __metadata("design:returntype", void 0)
], DiseaseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiseaseController.prototype, "remove", null);
exports.DiseaseController = DiseaseController = __decorate([
    (0, common_1.Controller)('diseases'),
    __metadata("design:paramtypes", [disease_service_1.DiseaseService, google_sheets_service_1.GoogleSheetsService, validation_service_1.ValidationService])
], DiseaseController);
//# sourceMappingURL=disease.controller.js.map