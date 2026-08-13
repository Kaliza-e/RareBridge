import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiseaseDto, CreateFaqDto, CreateFactMythDto, CreateSpecialistDto, CreateSourceDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';

@Injectable()
export class DiseaseService {
  constructor(private prisma: PrismaService) {}

  async create(createDiseaseDto: CreateDiseaseDto) {
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

  async findAll(search?: string, category?: string) {
    const where: any = {};
    
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

  async findOne(id: string) {
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
      throw new NotFoundException(`Disease with ID ${id} not found`);
    }

    return disease;
  }

  async findByDiseaseNumber(diseaseNumber: string) {
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
      throw new NotFoundException(`Disease with number ${diseaseNumber} not found`);
    }

    return disease;
  }

  async update(id: string, updateDiseaseDto: UpdateDiseaseDto) {
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

  async remove(id: string) {
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
}
