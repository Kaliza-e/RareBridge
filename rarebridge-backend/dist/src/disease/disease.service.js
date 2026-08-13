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
exports.DiseaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DiseaseService = class DiseaseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDiseaseDto) {
        const { faqs, factsMyths, specialists, sources, ...diseaseData } = createDiseaseDto;
        return this.prisma.disease.create({
            data: {
                ...diseaseData,
                faqs: faqs ? {
                    create: faqs.map(faq => ({
                        question: faq.question,
                        answer: faq.answer,
                        order: faq.order ?? 0,
                    }))
                } : undefined,
                factsMyths: factsMyths ? {
                    create: factsMyths.map(fm => ({
                        statement: fm.statement,
                        isFact: fm.isFact,
                        explanation: fm.explanation,
                        order: fm.order ?? 0,
                    }))
                } : undefined,
                specialists: specialists ? {
                    create: specialists.map(spec => ({
                        name: spec.name,
                        organization: spec.organization,
                        location: spec.location,
                        contact: spec.contact,
                        focus: spec.focus,
                        why: spec.why,
                    }))
                } : undefined,
                sources: sources ? {
                    create: sources.map(source => ({
                        title: source.title,
                        url: source.url,
                        type: source.type,
                        description: source.description,
                    }))
                } : undefined,
            },
            include: {
                faqs: true,
                factsMyths: true,
                specialists: true,
                sources: true,
            },
        });
    }
    async findAll(search, category) {
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
                { overview: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (category) {
            where.category = { equals: category, mode: 'insensitive' };
        }
        return this.prisma.disease.findMany({
            where,
            include: {
                faqs: { orderBy: { order: 'asc' } },
                factsMyths: { orderBy: { order: 'asc' } },
                specialists: true,
                sources: true,
            },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const disease = await this.prisma.disease.findUnique({
            where: { id },
            include: {
                faqs: { orderBy: { order: 'asc' } },
                factsMyths: { orderBy: { order: 'asc' } },
                specialists: true,
                sources: true,
            },
        });
        if (!disease) {
            throw new common_1.NotFoundException(`Disease with ID ${id} not found`);
        }
        return disease;
    }
    async findByDiseaseNumber(diseaseNumber) {
        const disease = await this.prisma.disease.findUnique({
            where: { diseaseNumber },
            include: {
                faqs: { orderBy: { order: 'asc' } },
                factsMyths: { orderBy: { order: 'asc' } },
                specialists: true,
                sources: true,
            },
        });
        if (!disease) {
            throw new common_1.NotFoundException(`Disease with number ${diseaseNumber} not found`);
        }
        return disease;
    }
    async update(id, updateDiseaseDto) {
        const { faqs, factsMyths, specialists, sources, ...diseaseData } = updateDiseaseDto;
        return this.prisma.disease.update({
            where: { id },
            data: {
                ...diseaseData,
                faqs: faqs ? {
                    deleteMany: {},
                    create: faqs.map(faq => ({
                        question: faq.question,
                        answer: faq.answer,
                        order: faq.order ?? 0,
                    }))
                } : undefined,
                factsMyths: factsMyths ? {
                    deleteMany: {},
                    create: factsMyths.map(fm => ({
                        statement: fm.statement,
                        isFact: fm.isFact,
                        explanation: fm.explanation,
                        order: fm.order ?? 0,
                    }))
                } : undefined,
                specialists: specialists ? {
                    deleteMany: {},
                    create: specialists.map(spec => ({
                        name: spec.name,
                        organization: spec.organization,
                        location: spec.location,
                        contact: spec.contact,
                        focus: spec.focus,
                        why: spec.why,
                    }))
                } : undefined,
                sources: sources ? {
                    deleteMany: {},
                    create: sources.map(source => ({
                        title: source.title,
                        url: source.url,
                        type: source.type,
                        description: source.description,
                    }))
                } : undefined,
            },
            include: {
                faqs: true,
                factsMyths: true,
                specialists: true,
                sources: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.disease.delete({
            where: { id },
        });
    }
    async getCategories() {
        const diseases = await this.prisma.disease.findMany({
            select: { category: true },
            distinct: ['category'],
        });
        return diseases.map(d => d.category).sort();
    }
};
exports.DiseaseService = DiseaseService;
exports.DiseaseService = DiseaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiseaseService);
//# sourceMappingURL=disease.service.js.map