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

      // Parse diagnosis field to extract structured procedures
      if (transformed.diagnosis) {
        transformed.diagnosis = this.parseDiagnosisField(transformed.diagnosis);
      }

      // Parse lifestyle field to extract structured sections
      if (transformed.lifestyleAndDailySupport) {
        transformed.lifestyleAndDailySupport = this.parseLifestyleField(transformed.lifestyleAndDailySupport);
      }

      // Parse research field to extract structured organizations
      if (transformed.treatmentsAndPharma) {
        transformed.treatmentsAndPharma = this.parseResearchField(transformed.treatmentsAndPharma);
      }

      // Parse nested JSON data if present
      ['faqs', 'factsMyths', 'specialists', 'sources'].forEach(field => {
        if (
          transformed[field] &&
          typeof transformed[field] === 'string'
        ) {
          try {
            transformed[field] = JSON.parse(transformed[field]);
          } catch {
            // If the spreadsheet contains plain text instead of JSON,
            // don't fail the entire disease import.
            transformed[field] = [];
          }
        }
      });

      console.log('Transformed row:', transformed);

      return transformed;
    });
  }

  private parseDiagnosisField(diagnosisText: string): string {
    // Extract the first meaningful description from disorganized diagnosis text
    // Remove the detailed procedure breakdowns and keep a concise description
    const lines = diagnosisText.split('•').map(line => line.trim());
    const firstLine = lines[0] || diagnosisText;
    
    // If the text is very long, truncate it to a reasonable summary
    if (firstLine.length > 500) {
      return firstLine.substring(0, 500) + '...';
    }
    
    return firstLine;
  }

  private parseLifestyleField(lifestyleText: string): string {
    // Extract key sections from disorganized lifestyle text
    // Focus on the most important information
    const sections = lifestyleText.split(/\n\n|\r\n\r\n/);
    
    // Prioritize: Therapies, Nutrition, Daily Care
    const priorityKeywords = ['Therapies', 'Diets', 'Nutrition', 'Daily Care', 'Tips'];
    let relevantSections = [];
    
    for (const section of sections) {
      for (const keyword of priorityKeywords) {
        if (section.toLowerCase().includes(keyword.toLowerCase())) {
          relevantSections.push(section.trim());
          break;
        }
      }
    }
    
    // If no priority sections found, return first section
    if (relevantSections.length === 0 && sections.length > 0) {
      return sections[0].trim().substring(0, 1000);
    }
    
    // Combine relevant sections with reasonable length limit
    const combined = relevantSections.join('\n\n');
    return combined.length > 1500 ? combined.substring(0, 1500) + '...' : combined;
  }

  private parseResearchField(researchText: string): string {
    // Extract organization names and focus areas from disorganized research text
    const lines = researchText.split(/\n/);
    let organizations = [];
    
    for (const line of lines) {
      // Look for lines that seem to contain organization info
      if (line.includes('•') || line.match(/^\d+\./)) {
        organizations.push(line.trim());
      }
    }
    
    // If no structured lines found, return first meaningful paragraph
    if (organizations.length === 0) {
      const paragraphs = researchText.split(/\n\n/);
      return paragraphs[0]?.trim().substring(0, 800) || researchText.substring(0, 800);
    }
    
    // Combine organization info
    const combined = organizations.join('\n');
    return combined.length > 1000 ? combined.substring(0, 1000) + '...' : combined;
  }
}
