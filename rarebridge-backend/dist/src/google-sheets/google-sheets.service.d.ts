export declare class GoogleSheetsService {
    private sheets;
    constructor();
    importDiseases(spreadsheetId: string, range: string): Promise<any>;
    private mapHeaderToField;
    parseNestedData(data: string, type: 'faq' | 'factMyth' | 'specialist' | 'source'): Promise<any[]>;
}
