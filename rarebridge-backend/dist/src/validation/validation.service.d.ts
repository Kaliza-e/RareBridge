export declare class ValidationService {
    validateDiseaseData(data: any): {
        valid: boolean;
        errors: string[];
        sanitized: any;
    };
    private validateFaq;
    private validateFactMyth;
    private validateSpecialist;
    private validateSource;
    private sanitizeString;
    transformGoogleSheetsData(rawData: any[]): any[];
    private parseDiagnosisField;
    private parseLifestyleField;
    private parseResearchField;
}
