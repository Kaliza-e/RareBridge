import { GoogleSheetsService } from '../google-sheets/google-sheets.service';
import { ValidationService } from '../validation/validation.service';
export declare class DiseaseService {
    private googleSheetsService;
    private validationService;
    private cachedDiseases;
    private lastFetchTime;
    private readonly CACHE_TTL_MS;
    constructor(googleSheetsService: GoogleSheetsService, validationService: ValidationService);
    private fetchAndCacheDiseases;
    findAll(search?: string, category?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findByDiseaseNumber(diseaseNumber: string): Promise<any>;
    getCategories(): Promise<string[]>;
}
