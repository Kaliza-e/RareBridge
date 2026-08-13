export declare class CreateDiseaseDto {
    diseaseNumber: string;
    name: string;
    category: string;
    overview: string;
    causes: string;
    typesAndSymptoms: string;
    diagnosis: string;
    lifestyleAndDailySupport: string;
    treatmentsAndPharma: string;
    faqs?: CreateFaqDto[];
    factsMyths?: CreateFactMythDto[];
    specialists?: CreateSpecialistDto[];
    sources?: CreateSourceDto[];
}
export declare class CreateFaqDto {
    question: string;
    answer: string;
    order?: number;
}
export declare class CreateFactMythDto {
    statement: string;
    isFact: boolean;
    explanation: string;
    order?: number;
}
export declare class CreateSpecialistDto {
    name: string;
    organization: string;
    location: string;
    contact?: string;
    focus: string;
    why: string;
}
export declare class CreateSourceDto {
    title: string;
    url?: string;
    type: string;
    description?: string;
}
