import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class PrismaService implements OnModuleInit, OnModuleDestroy {
    private prisma;
    constructor();
    get disease(): import("@prisma/client").Prisma.DiseaseDelegate<import("node_modules/@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    get fAQ(): import("@prisma/client").Prisma.FAQDelegate<import("node_modules/@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    get factMyth(): import("@prisma/client").Prisma.FactMythDelegate<import("node_modules/@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    get specialist(): import("@prisma/client").Prisma.SpecialistDelegate<import("node_modules/@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    get source(): import("@prisma/client").Prisma.SourceDelegate<import("node_modules/@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
