"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
let ValidationService = class ValidationService {
    validateDiseaseData(data) {
        const errors = [];
        const sanitized = {};
        const coreRequiredFields = [
            'diseaseNumber',
            'name',
            'category',
            'overview'
        ];
        const optionalFields = [
            'causes',
            'typesAndSymptoms',
            'diagnosis',
            'lifestyleAndDailySupport',
            'treatmentsAndPharma'
        ];
        for (const field of coreRequiredFields) {
            if (data[field] !== undefined && data[field] !== null && typeof data[field] === 'number') {
                data[field] = String(data[field]);
            }
            if (!data[field]) {
                errors.push(`${field} is required and must be a non-empty string`);
            }
            else if (typeof data[field] !== 'string') {
                errors.push(`${field} must be a string`);
            }
            else if (data[field].trim() === '') {
                errors.push(`${field} is required and must be a non-empty string`);
            }
            else {
                sanitized[field] = this.sanitizeString(data[field]);
            }
        }
        for (const field of optionalFields) {
            if (data[field] !== undefined && data[field] !== null && typeof data[field] === 'number') {
                data[field] = String(data[field]);
            }
            if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
                const defaults = {
                    causes: 'Information not available',
                    typesAndSymptoms: 'Information not available',
                    diagnosis: 'Information not available',
                    lifestyleAndDailySupport: 'Information not available',
                    treatmentsAndPharma: 'Information not available'
                };
                sanitized[field] = defaults[field];
                console.warn(`${field} is missing, using default value for disease:`, data.name);
            }
            else {
                sanitized[field] = this.sanitizeString(data[field]);
            }
        }
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
        if (data.faqs && Array.isArray(data.faqs)) {
            sanitized.faqs = data.faqs
                .map((faq) => this.validateFaq(faq))
                .filter((f) => f.valid)
                .map((f) => f.data);
            if (sanitized.faqs.length !== data.faqs.length) {
                console.warn('Some FAQs were invalid and were filtered out');
            }
        }
        else {
            sanitized.faqs = [];
        }
        if (data.factsMyths && Array.isArray(data.factsMyths)) {
            sanitized.factsMyths = data.factsMyths
                .map((fm) => this.validateFactMyth(fm))
                .filter((f) => f.valid)
                .map((f) => f.data);
            if (sanitized.factsMyths.length !== data.factsMyths.length) {
                console.warn('Some facts/myths were invalid and were filtered out');
            }
        }
        else {
            sanitized.factsMyths = [];
        }
        if (data.specialists && Array.isArray(data.specialists)) {
            sanitized.specialists = data.specialists
                .map((spec) => this.validateSpecialist(spec))
                .filter((s) => s.valid)
                .map((s) => s.data);
            if (sanitized.specialists.length !== data.specialists.length) {
                console.warn('Some specialists were invalid and were filtered out');
            }
        }
        else {
            sanitized.specialists = [];
        }
        if (data.sources && Array.isArray(data.sources)) {
            sanitized.sources = data.sources
                .map((source) => this.validateSource(source))
                .filter((s) => s.valid)
                .map((s) => s.data);
            if (sanitized.sources.length !== data.sources.length) {
                console.warn('Some sources were invalid and were filtered out');
            }
        }
        else {
            sanitized.sources = [];
        }
        if (errors.length > 0) {
            console.error('Validation errors for disease:', data.name, errors);
        }
        else {
            console.log('Validation passed for disease:', data.name);
        }
        return {
            valid: errors.length === 0,
            errors,
            sanitized
        };
    }
    validateFaq(faq) {
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
    validateFactMyth(fm) {
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
    validateSpecialist(spec) {
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
    validateSource(source) {
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
    sanitizeString(input) {
        if (typeof input !== 'string')
            return '';
        return input
            .trim()
            .replace(/<script[^>]*>.*?<\/script>/gi, '')
            .replace(/<[^>]*>/g, '')
            .replace(/\s+/g, ' ');
    }
    transformGoogleSheetsData(rawData) {
        console.log('Transforming raw data, first row:', rawData[0]);
        return rawData.map(row => {
            const transformed = { ...row };
            if (transformed.diseaseNumber !== undefined &&
                transformed.diseaseNumber !== null) {
                transformed.diseaseNumber = String(transformed.diseaseNumber).trim();
            }
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
                if (transformed[field] !== undefined &&
                    transformed[field] !== null) {
                    transformed[field] = String(transformed[field]).trim();
                }
            }
            if (transformed.diagnosis) {
                transformed.diagnosis = this.parseDiagnosisField(transformed.diagnosis);
            }
            if (transformed.lifestyleAndDailySupport) {
                transformed.lifestyleAndDailySupport = this.parseLifestyleField(transformed.lifestyleAndDailySupport);
            }
            if (transformed.treatmentsAndPharma) {
                transformed.treatmentsAndPharma = this.parseResearchField(transformed.treatmentsAndPharma);
            }
            ['faqs', 'factsMyths', 'specialists', 'sources'].forEach(field => {
                if (transformed[field] &&
                    typeof transformed[field] === 'string') {
                    try {
                        transformed[field] = JSON.parse(transformed[field]);
                    }
                    catch {
                        transformed[field] = [];
                    }
                }
            });
            console.log('Transformed row:', transformed);
            return transformed;
        });
    }
    parseDiagnosisField(diagnosisText) {
        const lines = diagnosisText.split('•').map(line => line.trim());
        const firstLine = lines[0] || diagnosisText;
        if (firstLine.length > 500) {
            return firstLine.substring(0, 500) + '...';
        }
        return firstLine;
    }
    parseLifestyleField(lifestyleText) {
        const sections = lifestyleText.split(/\n\n|\r\n\r\n/);
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
        if (relevantSections.length === 0 && sections.length > 0) {
            return sections[0].trim().substring(0, 1000);
        }
        const combined = relevantSections.join('\n\n');
        return combined.length > 1500 ? combined.substring(0, 1500) + '...' : combined;
    }
    parseResearchField(researchText) {
        const lines = researchText.split(/\n/);
        let organizations = [];
        for (const line of lines) {
            if (line.includes('•') || line.match(/^\d+\./)) {
                organizations.push(line.trim());
            }
        }
        if (organizations.length === 0) {
            const paragraphs = researchText.split(/\n\n/);
            return paragraphs[0]?.trim().substring(0, 800) || researchText.substring(0, 800);
        }
        const combined = organizations.join('\n');
        return combined.length > 1000 ? combined.substring(0, 1000) + '...' : combined;
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map