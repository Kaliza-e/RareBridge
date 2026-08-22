import { DiseaseService } from './disease.service';
export declare class DiseaseController {
    private readonly diseaseService;
    constructor(diseaseService: DiseaseService);
    findAll(search?: string, category?: string): Promise<any[]>;
    getCategories(): Promise<string[]>;
    findOne(id: string): Promise<any>;
    findByDiseaseNumber(diseaseNumber: string): Promise<any>;
}
