import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  validateDiseaseData(data: any): { valid: boolean; errors: string[]; sanitized: any } {
    const errors: string[] = [];
    const sanitized: any = {};

    // Core required fields (must have these)
    const coreRequiredFields = [
      'diseaseNumber',
      'name',
      'category',
      'overview'
    ];

    // Optional fields with defaults (can be missing but better if present)
    const optionalFields = [
      'causes',
      'typesAndSymptoms',
      'diagnosis',
      'lifestyleAndDailySupport',
      'treatmentsAndPharma'
    ];

    // Validate core required fields
    for (const field of coreRequiredFields) {
      if (data[field] !== undefined && data[field] !== null && typeof data[field] === 'number') {
        data[field] = String(data[field]);
      }
      
      if (!data[field]) {
        errors.push(`${field} is required and must be a non-empty string`);
      } else if (typeof data[field] !== 'string') {
        errors.push(`${field} must be a string`);
      } else if (data[field].trim() === '') {
        errors.push(`${field} is required and must be a non-empty string`);
      } else {
        sanitized[field] = this.sanitizeString(data[field]);
      }
    }

    // Validate optional fields with defaults
    for (const field of optionalFields) {
      if (data[field] !== undefined && data[field] !== null && typeof data[field] === 'number') {
        data[field] = String(data[field]);
      }
      
      if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
        // Use default values for missing optional fields
        const defaults = {
          causes: 'Information not available',
          typesAndSymptoms: 'Information not available',
          diagnosis: 'Information not available',
          lifestyleAndDailySupport: 'Information not available',
          treatmentsAndPharma: 'Information not available'
        };
        sanitized[field] = defaults[field];
        console.warn(`${field} is missing, using default value for disease:`, data.name);
      } else {
        sanitized[field] = this.sanitizeString(data[field]);
      }
    }

    // Validate field lengths to prevent excessively long content
    const maxLengths = {
      overview: 2000,
      causes: 2000,
      typesAndSymptoms: 3000,
      diagnosis: 2000,
      lifestyleAndDailySupport: 5000,
      treatmentsAndPharma: 5000
    };

    for (const [field, maxLength] of Object.entries(maxLengths)) {
      if (sanitized[field] && sanitized[field].length > maxLength) {
        console.warn(`${field} exceeds ${maxLength} characters, truncating`);
        sanitized[field] = sanitized[field].substring(0, maxLength) + '...';
      }
    }

    // Validate nested arrays
    if (data.faqs && Array.isArray(data.faqs)) {
      sanitized.faqs = data.faqs
        .map((faq: any) => this.validateFaq(faq))
        .filter((f: any) => f.valid)
        .map((f: any) => f.data);
      if (sanitized.faqs.length !== data.faqs.length) {
        console.warn('Some FAQs were invalid and were filtered out');
      }
    } else {
      sanitized.faqs = [];
    }

    if (data.factsMyths && Array.isArray(data.factsMyths)) {
      sanitized.factsMyths = data.factsMyths
        .map((fm: any) => this.validateFactMyth(fm))
        .filter((f: any) => f.valid)
        .map((f: any) => f.data);
      if (sanitized.factsMyths.length !== data.factsMyths.length) {
        console.warn('Some facts/myths were invalid and were filtered out');
      }
    } else {
      sanitized.factsMyths = [];
    }

    if (data.specialists && Array.isArray(data.specialists)) {
      sanitized.specialists = data.specialists
        .map((spec: any) => this.validateSpecialist(spec))
        .filter((s: any) => s.valid)
        .map((s: any) => s.data);
      if (sanitized.specialists.length !== data.specialists.length) {
        console.warn('Some specialists were invalid and were filtered out');
      }
    } else {
      sanitized.specialists = [];
    }

    if (data.sources && Array.isArray(data.sources)) {
      sanitized.sources = data.sources
        .map((source: any) => this.validateSource(source))
        .filter((s: any) => s.valid)
        .map((s: any) => s.data);
      if (sanitized.sources.length !== data.sources.length) {
        console.warn('Some sources were invalid and were filtered out');
      }
    } else {
      sanitized.sources = [];
    }

    // Log validation results for debugging
    if (errors.length > 0) {
      console.error('Validation errors for disease:', data.name, errors);
    } else {
      console.log('Validation passed for disease:', data.name);
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
    console.log('Transforming raw data, first row:', rawData[0]);
    return rawData.map(row => {
      const transformed: any = { ...row };

      // Google Sheets may return diseaseNumber as a number
      if (
        transformed.diseaseNumber !== undefined &&
        transformed.diseaseNumber !== null
      ) {
        transformed.diseaseNumber = String(transformed.diseaseNumber).trim();
      }

      // Normalize required string fields
      const stringFields = [
        'name',
        'category',
        'overview',
        'causes',
        'typesAndSymptoms',
        'diagnosis',
        'lifestyleAndDailySupport',
        'treatmentsAndPharma',
      ];

      for (const field of stringFields) {
        if (
          transformed[field] !== undefined &&
          transformed[field] !== null
        ) {
          transformed[field] = String(transformed[field]).trim();
        }
      }

      // Parse diagnosis field if present
      if (transformed.diagnosis) {
        transformed.diagnosis = this.parseDiagnosisField(transformed.diagnosis);
      }

      // Parse lifestyle field if present
      if (transformed.lifestyleAndDailySupport) {
        transformed.lifestyleAndDailySupport = this.parseLifestyleField(transformed.lifestyleAndDailySupport);
      }

      // Parse research field if present
      if (transformed.treatmentsAndPharma) {
        transformed.treatmentsAndPharma = this.parseResearchField(transformed.treatmentsAndPharma);
      }

      // Parse nested JSON data if present, or parse free-text if provided
      ['faqs', 'factsMyths', 'specialists', 'sources'].forEach(field => {
        if (
          transformed[field] &&
          typeof transformed[field] === 'string'
        ) {
          const raw = transformed[field].trim();
          if (raw === '') {
            transformed[field] = [];
            return;
          }
          try {
            transformed[field] = JSON.parse(raw);
          } catch {
            // If the cell is plain text, parse basic structures if possible
            if (field === 'faqs') {
              transformed[field] = this.parsePlainTextFaqs(raw);
            } else if (field === 'factsMyths') {
              transformed[field] = this.parsePlainTextFactsMyths(raw);
            } else if (field === 'specialists') {
              transformed[field] = this.parsePlainTextSpecialists(raw);
            } else if (field === 'sources') {
              transformed[field] = this.parsePlainTextSources(raw);
            } else {
              transformed[field] = [];
            }
          }
        }
      });

      console.log('Transformed row:', transformed);

      return transformed;
    });
  }

  private parsePlainTextFaqs(text: string): any[] {
    if (!text || typeof text !== 'string') return [];
    // Split by Q: / A: or numbered items
    const faqs: any[] = [];
    const blocks = text.split(/(?=(?:Q:|Question:|\b\d+\.))/i).filter(b => b.trim());
    
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i].trim();
      const parts = block.split(/(?:A:|Answer:|\r?\n)/i).map(p => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        faqs.push({
          question: parts[0].replace(/^(?:Q:|Question:|\d+\.)\s*/i, '').trim(),
          answer: parts.slice(1).join(' ').trim(),
          order: i + 1,
        });
      } else if (parts.length === 1 && parts[0].length > 10) {
        faqs.push({
          question: parts[0].replace(/^(?:Q:|Question:|\d+\.)\s*/i, '').trim(),
          answer: 'Refer to specialist directory and community resources for detailed answers.',
          order: i + 1,
        });
      }
    }
    return faqs;
  }

  private parsePlainTextFactsMyths(text: string): any[] {
    if (!text || typeof text !== 'string') return [];
    const items: any[] = [];
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isMyth = /myth/i.test(line);
      const isFact = /fact/i.test(line) && !isMyth;
      const cleanStatement = line.replace(/^(?:Myth|Fact|Statement|\d+\.|\*|-)\s*[:\-]?\s*/i, '').trim();
      
      if (cleanStatement) {
        items.push({
          statement: cleanStatement,
          isFact: isFact,
          explanation: line,
          order: i + 1,
        });
      }
    }
    return items;
  }

  private parsePlainTextSpecialists(text: string): any[] {
    if (!text || typeof text !== 'string') return [];
    const items: any[] = [];
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    
    for (const line of lines) {
      const parts = line.split(/[•|\-,]/).map(p => p.trim()).filter(Boolean);
      if (parts.length >= 1) {
        items.push({
          name: parts[0].replace(/^Dr\.?\s*/i, 'Dr. ') || 'Specialist Clinic',
          organization: parts[1] || 'Medical Center / Research Institute',
          location: parts[2] || 'Global / Nationwide',
          contact: null,
          focus: parts[3] || 'Specialized Care',
          why: line,
        });
      }
    }
    return items;
  }

  private parsePlainTextSources(text: string): any[] {
    if (!text || typeof text !== 'string') return [];
    const items: any[] = [];
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    
    for (const line of lines) {
      const urlMatch = line.match(/(https?:\/\/[^\s]+)/i);
      items.push({
        title: line.replace(/(https?:\/\/[^\s]+)/gi, '').trim() || 'Medical Reference',
        url: urlMatch ? urlMatch[0] : null,
        type: 'Medical Reference',
        description: line,
      });
    }
    return items;
  }

  private parseDiagnosisField(diagnosisText: string): string {
    if (!diagnosisText) return '';
    return diagnosisText.trim();
  }

  private parseLifestyleField(lifestyleText: string): string {
    if (!lifestyleText) return '';
    return lifestyleText.trim();
  }

  private parseResearchField(researchText: string): string {
    if (!researchText) return '';
    return researchText.trim();
  }
}
