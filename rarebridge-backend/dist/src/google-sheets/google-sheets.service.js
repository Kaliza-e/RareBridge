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
exports.GoogleSheetsService = void 0;
const common_1 = require("@nestjs/common");
const { google } = require('googleapis');
let GoogleSheetsService = class GoogleSheetsService {
    constructor() {
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });
        this.sheets = google.sheets({ version: 'v4', auth });
    }
    async importDiseases(spreadsheetId, range) {
        try {
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
            const rows = response.data.values;
            if (!rows || rows.length === 0) {
                throw new Error('No data found in spreadsheet');
            }
            const headers = rows[0];
            console.log('Google Sheets headers:', headers);
            const dataRows = rows.slice(1);
            const diseases = dataRows.map((row) => {
                const disease = {};
                headers.forEach((header, index) => {
                    const key = this.mapHeaderToField(header);
                    disease[key] = row[index] || '';
                });
                return disease;
            });
            return diseases;
        }
        catch (error) {
            console.error('Error importing from Google Sheets:', error);
            throw error;
        }
    }
    mapHeaderToField(header) {
        const headerMap = {
            'disease no.': 'diseaseNumber',
            'disease no': 'diseaseNumber',
            'disease number': 'diseaseNumber',
            'disease name': 'name',
            'name': 'name',
            'category': 'category',
            'overview': 'overview',
            'causes': 'causes',
            'types and symptoms': 'typesAndSymptoms',
            'diagnosis': 'diagnosis',
            'lifestyle and daily support + community': 'lifestyleAndDailySupport',
            'lifestyle and daily support': 'lifestyleAndDailySupport',
            'research and pharma directory': 'treatmentsAndPharma',
            'treatments and pharma': 'treatmentsAndPharma',
            'faqs': 'faqs',
            'faqs for a disease': 'faqs',
            'facts vs. myths': 'factsMyths',
            'facts vs myths': 'factsMyths',
            'speacislist directory': 'specialists',
            'specialist directory': 'specialists',
            'sources': 'sources',
        };
        const normalizedHeader = header.toLowerCase().trim();
        return headerMap[normalizedHeader] || normalizedHeader;
    }
    async parseNestedData(data, type) {
        if (!data || typeof data !== 'string')
            return [];
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch {
            return [];
        }
    }
};
exports.GoogleSheetsService = GoogleSheetsService;
exports.GoogleSheetsService = GoogleSheetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleSheetsService);
//# sourceMappingURL=google-sheets.service.js.map