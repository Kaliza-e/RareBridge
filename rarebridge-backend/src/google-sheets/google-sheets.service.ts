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
      // Disease No.
      'disease no.': 'diseaseNumber',
      'disease no': 'diseaseNumber',
      'disease number': 'diseaseNumber',
      'disease #': 'diseaseNumber',
      'no.': 'diseaseNumber',
      'no': 'diseaseNumber',

      // Disease name
      'disease name': 'name',
      'name': 'name',
      'disease': 'name',

      // Category
      'category': 'category',
      'categories': 'category',

      // Overview
      'overview': 'overview',
      'description': 'overview',
      'summary': 'overview',

      // Causes
      'causes': 'causes',
      'cause': 'causes',

      // Types and symptoms
      'types and symptoms': 'typesAndSymptoms',
      'types & symptoms': 'typesAndSymptoms',
      'causes, types and symptoms': 'typesAndSymptoms',
      'causes, types & symptoms': 'typesAndSymptoms',
      'symptoms': 'typesAndSymptoms',
      'types': 'typesAndSymptoms',

      // Diagnosis
      'diagnosis': 'diagnosis',
      'diagnostic': 'diagnosis',
      'diagnostics': 'diagnosis',

      // Lifestyle and daily support + community
      'lifestyle and daily support+community': 'lifestyleAndDailySupport',
      'lifestyle and daily support + community': 'lifestyleAndDailySupport',
      'lifestyle and daily support': 'lifestyleAndDailySupport',
      'lifestyle & daily support + community': 'lifestyleAndDailySupport',
      'lifestyle & daily support': 'lifestyleAndDailySupport',
      'lifestyle': 'lifestyleAndDailySupport',

      // Research and pharma directory
      'research and pharma directory': 'treatmentsAndPharma',
      'research & pharma directory': 'treatmentsAndPharma',
      'research and pharma': 'treatmentsAndPharma',
      'research & pharma': 'treatmentsAndPharma',
      'treatments and pharma': 'treatmentsAndPharma',
      'treatments and pharma directory': 'treatmentsAndPharma',
      'research': 'treatmentsAndPharma',

      // FAQs
      'faqs': 'faqs',
      'faq': 'faqs',
      'faqs for a disease': 'faqs',
      'faq for a disease': 'faqs',

      // Facts vs. Myths
      'facts vs. myths': 'factsMyths',
      'facts vs myths': 'factsMyths',
      'fact vs. myth': 'factsMyths',
      'fact vs myth': 'factsMyths',
      'facts vs. myths.': 'factsMyths',
      'facts and myths': 'factsMyths',

      // Specialist directory
      'specialist directory': 'specialists',
      'specialists directory': 'specialists',
      'specialist': 'specialists',
      'specialists': 'specialists',
      'speacislist directory': 'specialists', // typo fallback

      // Sources
      'sources': 'sources',
      'source': 'sources',
      'source directory': 'sources',
    };

    const normalizedHeader = header.toLowerCase().replace(/\s+/g, ' ').trim();
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
