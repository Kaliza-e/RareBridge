import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateDiseaseDto {
  @IsString()
  @IsNotEmpty()
  diseaseNumber: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  overview: string;

  @IsString()
  @IsNotEmpty()
  causes: string;

  @IsString()
  @IsNotEmpty()
  typesAndSymptoms: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  lifestyleAndDailySupport: string;

  @IsString()
  @IsNotEmpty()
  treatmentsAndPharma: string;

  @IsArray()
  @IsOptional()
  faqs?: CreateFaqDto[];

  @IsArray()
  @IsOptional()
  factsMyths?: CreateFactMythDto[];

  @IsArray()
  @IsOptional()
  specialists?: CreateSpecialistDto[];

  @IsArray()
  @IsOptional()
  sources?: CreateSourceDto[];
}

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsOptional()
  order?: number;
}

export class CreateFactMythDto {
  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsNotEmpty()
  isFact: boolean;

  @IsString()
  @IsNotEmpty()
  explanation: string;

  @IsOptional()
  order?: number;
}

export class CreateSpecialistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  organization: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsNotEmpty()
  focus: string;

  @IsString()
  @IsNotEmpty()
  why: string;
}

export class CreateSourceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  description?: string;
}
