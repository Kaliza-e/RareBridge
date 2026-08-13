import { DiseaseService } from './disease.service';
import { GoogleSheetsService } from '../google-sheets/google-sheets.service';
import { ValidationService } from '../validation/validation.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
export declare class DiseaseController {
    private readonly diseaseService;
    private readonly googleSheetsService;
    private readonly validationService;
    constructor(diseaseService: DiseaseService, googleSheetsService: GoogleSheetsService, validationService: ValidationService);
    importFromSheets(spreadsheetId: string, range: string): Promise<{
        imported: number;
        failed: number;
        diseases: any[];
        errors: any[];
    }>;
    create(createDiseaseDto: CreateDiseaseDto): Promise<{
        factsMyths: {
            id: string;
            diseaseId: string;
            statement: string;
            isFact: boolean;
            explanation: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        faqs: {
            id: string;
            diseaseId: string;
            question: string;
            answer: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        sources: {
            id: string;
            diseaseId: string;
            title: string;
            url: string | null;
            type: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        specialists: {
            id: string;
            diseaseId: string;
            name: string;
            organization: string;
            location: string;
            contact: string | null;
            focus: string;
            why: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        diseaseNumber: string;
        name: string;
        category: string;
        overview: string;
        causes: string;
        typesAndSymptoms: string;
        diagnosis: string;
        lifestyleAndDailySupport: string;
        treatmentsAndPharma: string;
        createdAt: Date;
        updatedAt: Date;
    }> | {
        valid: boolean;
        errors: string[];
    };
    findAll(search?: string, category?: string): Promise<({
        factsMyths: {
            id: string;
            diseaseId: string;
            statement: string;
            isFact: boolean;
            explanation: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        faqs: {
            id: string;
            diseaseId: string;
            question: string;
            answer: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        sources: {
            id: string;
            diseaseId: string;
            title: string;
            url: string | null;
            type: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        specialists: {
            id: string;
            diseaseId: string;
            name: string;
            organization: string;
            location: string;
            contact: string | null;
            focus: string;
            why: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        diseaseNumber: string;
        name: string;
        category: string;
        overview: string;
        causes: string;
        typesAndSymptoms: string;
        diagnosis: string;
        lifestyleAndDailySupport: string;
        treatmentsAndPharma: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getCategories(): Promise<string[]>;
    findOne(id: string): Promise<{
        factsMyths: {
            id: string;
            diseaseId: string;
            statement: string;
            isFact: boolean;
            explanation: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        faqs: {
            id: string;
            diseaseId: string;
            question: string;
            answer: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        sources: {
            id: string;
            diseaseId: string;
            title: string;
            url: string | null;
            type: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        specialists: {
            id: string;
            diseaseId: string;
            name: string;
            organization: string;
            location: string;
            contact: string | null;
            focus: string;
            why: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        diseaseNumber: string;
        name: string;
        category: string;
        overview: string;
        causes: string;
        typesAndSymptoms: string;
        diagnosis: string;
        lifestyleAndDailySupport: string;
        treatmentsAndPharma: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByDiseaseNumber(diseaseNumber: string): Promise<{
        factsMyths: {
            id: string;
            diseaseId: string;
            statement: string;
            isFact: boolean;
            explanation: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        faqs: {
            id: string;
            diseaseId: string;
            question: string;
            answer: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        sources: {
            id: string;
            diseaseId: string;
            title: string;
            url: string | null;
            type: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        specialists: {
            id: string;
            diseaseId: string;
            name: string;
            organization: string;
            location: string;
            contact: string | null;
            focus: string;
            why: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        diseaseNumber: string;
        name: string;
        category: string;
        overview: string;
        causes: string;
        typesAndSymptoms: string;
        diagnosis: string;
        lifestyleAndDailySupport: string;
        treatmentsAndPharma: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateDiseaseDto: UpdateDiseaseDto): Promise<{
        factsMyths: {
            id: string;
            diseaseId: string;
            statement: string;
            isFact: boolean;
            explanation: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        faqs: {
            id: string;
            diseaseId: string;
            question: string;
            answer: string;
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        sources: {
            id: string;
            diseaseId: string;
            title: string;
            url: string | null;
            type: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        specialists: {
            id: string;
            diseaseId: string;
            name: string;
            organization: string;
            location: string;
            contact: string | null;
            focus: string;
            why: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        diseaseNumber: string;
        name: string;
        category: string;
        overview: string;
        causes: string;
        typesAndSymptoms: string;
        diagnosis: string;
        lifestyleAndDailySupport: string;
        treatmentsAndPharma: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        diseaseNumber: string;
        name: string;
        category: string;
        overview: string;
        causes: string;
        typesAndSymptoms: string;
        diagnosis: string;
        lifestyleAndDailySupport: string;
        treatmentsAndPharma: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
