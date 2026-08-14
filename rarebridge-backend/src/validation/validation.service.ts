import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  validateDiseaseData(data: any): { valid: boolean; errors: string[]; sanitized: any } {
    const errors: string[] = [];
    const sanitized: any = {};

    // Required fields validation
    const requiredFields = [
      'diseaseNumber',
      'name',
      'category',
      'overview',
      'causes',
      'typesAndSymptoms',
      'diagnosis',
      'lifestyleAndDailySupport',
      'treatmentsAndPharma'
    ];

    for (const field of requiredFields) {
      // Coerce numbers to strings (e.g. diseaseNumber comes in as an integer from Google Sheets)
      if (data[field] !== undefined && data[field] !== null && typeof data[field] === 'number') {
        data[field] = String(data[field]);
      }
      if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
        errors.push(`${field} is required and must be a non-empty string`);
      } else {
        sanitized[field] = this.sanitizeString(data[field]);
      }
    }

    // Validate nested arrays
    if (data.faqs && Array.isArray(data.faqs)) {
      sanitized.faqs = data.faqs.map((faq: any) => this.validateFaq(faq)).filter((f: any) => f.valid);
      if (sanitized.faqs.length !== data.faqs.length) {
        errors.push('Some FAQs were invalid and were filtered out');
      }
    }

    if (data.factsMyths && Array.isArray(data.factsMyths)) {
      sanitized.factsMyths = data.factsMyths.map((fm: any) => this.validateFactMyth(fm)).filter((f: any) => f.valid);
      if (sanitized.factsMyths.length !== data.factsMyths.length) {
        errors.push('Some facts/myths were invalid and were filtered out');
      }
    }

    if (data.specialists && Array.isArray(data.specialists)) {
      sanitized.specialists = data.specialists.map((spec: any) => this.validateSpecialist(spec)).filter((s: any) => s.valid);
      if (sanitized.specialists.length !== data.specialists.length) {
        errors.push('Some specialists were invalid and were filtered out');
      }
    }

    if (data.sources && Array.isArray(data.sources)) {
      sanitized.sources = data.sources.map((source: any) => this.validateSource(source)).filter((s: any) => s.valid);
      if (sanitized.sources.length !== data.sources.length) {
        errors.push('Some sources were invalid and were filtered out');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      sanitized
    };
  }

  private validateFaq(faq: any): { valid: boolean; data: any } {
    if (!faq.question || !faq.answer || typeof faq.question !== 'string' || typeof faq.answer !== 'string') {
      return { valid: false, data: faq };
    }
    return {
      valid: true,
      data: {
        question: this.sanitizeString(faq.question),
        answer: this.sanitizeString(faq.answer),
        order: faq.order || 0
      }
    };
  }

  private validateFactMyth(fm: any): { valid: boolean; data: any } {
    if (!fm.statement || !fm.explanation || typeof fm.statement !== 'string' || typeof fm.explanation !== 'string') {
      return { valid: false, data: fm };
    }
    if (typeof fm.isFact !== 'boolean') {
      return { valid: false, data: fm };
    }
    return {
      valid: true,
      data: {
        statement: this.sanitizeString(fm.statement),
        isFact: fm.isFact,
        explanation: this.sanitizeString(fm.explanation),
        order: fm.order || 0
      }
    };
  }

  private validateSpecialist(spec: any): { valid: boolean; data: any } {
    const required = ['name', 'organization', 'location', 'focus', 'why'];
    for (const field of required) {
      if (!spec[field] || typeof spec[field] !== 'string') {
        return { valid: false, data: spec };
      }
    }
    return {
      valid: true,
      data: {
        name: this.sanitizeString(spec.name),
        organization: this.sanitizeString(spec.organization),
        location: this.sanitizeString(spec.location),
        contact: spec.contact ? this.sanitizeString(spec.contact) : null,
        focus: this.sanitizeString(spec.focus),
        why: this.sanitizeString(spec.why)
      }
    };
  }

  private validateSource(source: any): { valid: boolean; data: any } {
    if (!source.title || !source.type || typeof source.title !== 'string' || typeof source.type !== 'string') {
      return { valid: false, data: source };
    }
    return {
      valid: true,
      data: {
        title: this.sanitizeString(source.title),
        url: source.url ? this.sanitizeString(source.url) : null,
        type: this.sanitizeString(source.type),
        description: source.description ? this.sanitizeString(source.description) : null
      }
    };
  }

  private sanitizeString(input: string): string {
    if (typeof input !== 'string') return '';
    return input
      .trim()
      .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' '); // Normalize whitespace
  }

  transformGoogleSheetsData(rawData: any[]): any[] {
    return rawData.map(row => {
      const transformed: any = {};
      
      // Map Google Sheets column headers to our schema
      Object.keys(row).forEach(key => {
        const normalizedKey = key.toLowerCase().trim();
        const fieldMap: { [key: string]: string } = {
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
          'specialist directory': 'specialists', // correct spelling fallback
          'sources': 'sources'
        };

        const mappedKey = fieldMap[normalizedKey] || normalizedKey;
        transformed[mappedKey] = row[key];
      });

      // Coerce diseaseNumber to string (Google Sheets sends it as an integer)
      if (transformed.diseaseNumber !== undefined && transformed.diseaseNumber !== null) {
        transformed.diseaseNumber = String(transformed.diseaseNumber).trim();
      }

      // Parse nested JSON data if present; fall back to empty array for plain text
      ['faqs', 'factsMyths', 'specialists', 'sources'].forEach(field => {
        if (transformed[field] && typeof transformed[field] === 'string') {
          try {
            transformed[field] = JSON.parse(transformed[field]);
          } catch {
            // Spreadsheet stores these as plain text, not JSON — treat as empty array
            transformed[field] = [];
          }
        }
      });

      return transformed;
    });
  }
}
