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
            if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
                errors.push(`${field} is required and must be a non-empty string`);
            }
            else {
                sanitized[field] = this.sanitizeString(data[field]);
            }
        }
        if (data.faqs && Array.isArray(data.faqs)) {
            sanitized.faqs = data.faqs.map((faq) => this.validateFaq(faq)).filter((f) => f.valid);
            if (sanitized.faqs.length !== data.faqs.length) {
                errors.push('Some FAQs were invalid and were filtered out');
            }
        }
        if (data.factsMyths && Array.isArray(data.factsMyths)) {
            sanitized.factsMyths = data.factsMyths.map((fm) => this.validateFactMyth(fm)).filter((f) => f.valid);
            if (sanitized.factsMyths.length !== data.factsMyths.length) {
                errors.push('Some facts/myths were invalid and were filtered out');
            }
        }
        if (data.specialists && Array.isArray(data.specialists)) {
            sanitized.specialists = data.specialists.map((spec) => this.validateSpecialist(spec)).filter((s) => s.valid);
            if (sanitized.specialists.length !== data.specialists.length) {
                errors.push('Some specialists were invalid and were filtered out');
            }
        }
        if (data.sources && Array.isArray(data.sources)) {
            sanitized.sources = data.sources.map((source) => this.validateSource(source)).filter((s) => s.valid);
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
        return rawData.map(row => {
            const transformed = {};
            Object.keys(row).forEach(key => {
                const normalizedKey = key.toLowerCase().trim();
                const fieldMap = {
                    'disease number': 'diseaseNumber',
                    'name': 'name',
                    'category': 'category',
                    'overview': 'overview',
                    'causes': 'causes',
                    'types and symptoms': 'typesAndSymptoms',
                    'diagnosis': 'diagnosis',
                    'lifestyle and daily support': 'lifestyleAndDailySupport',
                    'treatments and pharma': 'treatmentsAndPharma',
                    'faqs for a disease': 'faqs',
                    'facts vs myths': 'factsMyths',
                    'specialist directory': 'specialists',
                    'sources': 'sources'
                };
                const mappedKey = fieldMap[normalizedKey] || normalizedKey;
                transformed[mappedKey] = row[key];
            });
            ['faqs', 'factsMyths', 'specialists', 'sources'].forEach(field => {
                if (transformed[field] && typeof transformed[field] === 'string') {
                    try {
                        transformed[field] = JSON.parse(transformed[field]);
                    }
                    catch {
                        transformed[field] = [];
                    }
                }
            });
            return transformed;
        });
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map