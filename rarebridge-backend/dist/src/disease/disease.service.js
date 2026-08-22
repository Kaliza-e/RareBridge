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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseService = void 0;
const common_1 = require("@nestjs/common");
const google_sheets_service_1 = require("../google-sheets/google-sheets.service");
const validation_service_1 = require("../validation/validation.service");
let DiseaseService = class DiseaseService {
    constructor(googleSheetsService, validationService) {
        this.googleSheetsService = googleSheetsService;
        this.validationService = validationService;
        this.cachedDiseases = [];
        this.lastFetchTime = 0;
        this.CACHE_TTL_MS = 5 * 60 * 1000;
    }
    async fetchAndCacheDiseases() {
        const now = Date.now();
        if (this.cachedDiseases.length > 0 && (now - this.lastFetchTime) < this.CACHE_TTL_MS) {
            return this.cachedDiseases;
        }
        try {
            console.log('Fetching diseases from Google Sheets...');
            const rawData = await this.googleSheetsService.importDiseases();
            const transformedData = this.validationService.transformGoogleSheetsData(rawData);
            const validDiseases = [];
            for (const disease of transformedData) {
                const validation = this.validationService.validateDiseaseData(disease);
                if (validation.valid) {
                    validDiseases.push({
                        id: validation.sanitized.diseaseNumber,
                        ...validation.sanitized
                    });
                }
                else {
                    console.error('Validation failed for disease:', disease.name, validation.errors);
                }
            }
            this.cachedDiseases = validDiseases;
            this.lastFetchTime = now;
            console.log(`Successfully cached ${validDiseases.length} diseases.`);
            return this.cachedDiseases;
        }
        catch (error) {
            console.error('Error fetching and caching diseases:', error);
            if (this.cachedDiseases.length > 0) {
                console.warn('Returning stale cache due to fetch error.');
                return this.cachedDiseases;
            }
            throw error;
        }
    }
    async findAll(search, category) {
        let diseases = await this.fetchAndCacheDiseases();
        if (search) {
            const searchLower = search.toLowerCase();
            diseases = diseases.filter(d => (d.name && d.name.toLowerCase().includes(searchLower)) ||
                (d.category && d.category.toLowerCase().includes(searchLower)) ||
                (d.overview && d.overview.toLowerCase().includes(searchLower)));
        }
        if (category) {
            const catLower = category.toLowerCase();
            diseases = diseases.filter(d => d.category && d.category.toLowerCase() === catLower);
        }
        return diseases.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    async findOne(id) {
        const diseases = await this.fetchAndCacheDiseases();
        const disease = diseases.find(d => d.id === id || d.diseaseNumber === id);
        if (!disease) {
            throw new common_1.NotFoundException(`Disease with ID/Number ${id} not found`);
        }
        return disease;
    }
    async findByDiseaseNumber(diseaseNumber) {
        const diseases = await this.fetchAndCacheDiseases();
        const disease = diseases.find(d => d.diseaseNumber === diseaseNumber);
        if (!disease) {
            throw new common_1.NotFoundException(`Disease with number ${diseaseNumber} not found`);
        }
        return disease;
    }
    async getCategories() {
        const diseases = await this.fetchAndCacheDiseases();
        const categories = new Set(diseases.map(d => d.category).filter(Boolean));
        return Array.from(categories).sort();
    }
};
exports.DiseaseService = DiseaseService;
exports.DiseaseService = DiseaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [google_sheets_service_1.GoogleSheetsService, validation_service_1.ValidationService])
], DiseaseService);
//# sourceMappingURL=disease.service.js.map