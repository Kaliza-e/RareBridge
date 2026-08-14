import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');

@Injectable()
export class GoogleSheetsService {
  private sheets: any;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async importDiseases(spreadsheetId: string, range: string) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        throw new Error('No data found in spreadsheet');
      }

      // Assuming first row contains headers
      const headers = rows[0];
      console.log('Google Sheets headers:', headers);
      const dataRows = rows.slice(1);

      // Map Google Sheets columns to our data structure
      const diseases = dataRows.map((row: any[]) => {
        const disease: any = {};
        headers.forEach((header: string, index: number) => {
          const key = this.mapHeaderToField(header);
          disease[key] = row[index] || '';
        });
        return disease;
      });

      return diseases;
    } catch (error) {
      console.error('Error importing from Google Sheets:', error);
      throw error;
    }
  }

  private mapHeaderToField(header: string): string {
    const headerMap: { [key: string]: string } = {
      'disease no.': 'diseaseNumber',
      'disease no': 'diseaseNumber',       // also handle without period
      'disease number': 'diseaseNumber',   // legacy fallback
      'disease name': 'name',
      'name': 'name',                      // legacy fallback
      'category': 'category',
      'overview': 'overview',
      'causes': 'causes',
      'types and symptoms': 'typesAndSymptoms',
      'diagnosis': 'diagnosis',
      'lifestyle and daily support + community': 'lifestyleAndDailySupport',
      'lifestyle and daily support': 'lifestyleAndDailySupport', // legacy fallback
      'research and pharma directory': 'treatmentsAndPharma',
      'treatments and pharma': 'treatmentsAndPharma',            // legacy fallback
      'faqs': 'faqs',
      'faqs for a disease': 'faqs',        // legacy fallback
      'facts vs. myths': 'factsMyths',
      'facts vs myths': 'factsMyths',      // legacy fallback (no period)
      'speacislist directory': 'specialists', // spreadsheet typo
      'specialist directory': 'specialists', // legacy fallback correct spelling
      'sources': 'sources',
    };

    const normalizedHeader = header.toLowerCase().trim();
    return headerMap[normalizedHeader] || normalizedHeader;
  }

  async parseNestedData(data: string, type: 'faq' | 'factMyth' | 'specialist' | 'source'): Promise<any[]> {
    if (!data || typeof data !== 'string') return [];

    // This is a placeholder - you'll need to adjust the parsing logic
    // based on how your data is structured in the Google Sheets
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // If not JSON, parse based on your sheet format
      return [];
    }
  }
}
