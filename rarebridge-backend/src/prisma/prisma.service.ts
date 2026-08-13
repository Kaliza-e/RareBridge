import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });

    this.prisma = new PrismaClient({
      adapter,
    });
  }

  get disease() {
    return this.prisma.disease;
  }

  get fAQ() {
    return this.prisma.fAQ;
  }

  get factMyth() {
    return this.prisma.factMyth;
  }

  get specialist() {
    return this.prisma.specialist;
  }

  get source() {
    return this.prisma.source;
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}