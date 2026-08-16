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
    private parsePlainTextFaqs;
    private parsePlainTextFactsMyths;
    private parsePlainTextSpecialists;
    private parsePlainTextSources;
    private parseDiagnosisField;
    private parseLifestyleField;
    private parseResearchField;
}
