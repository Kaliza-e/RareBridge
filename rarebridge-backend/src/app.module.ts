import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiseaseModule } from './disease/disease.module';
import { PrismaModule } from './prisma/prisma.module';
import { GoogleSheetsModule } from './google-sheets/google-sheets.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    DiseaseModule,
    GoogleSheetsModule,
    ValidationModule,
  ],
})
export class AppModule {}
