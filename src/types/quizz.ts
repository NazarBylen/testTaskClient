export type QuestionType = 'input' | 'boolean' | 'checkbox';

export type Question = {
    id?: number;
    type: QuestionType;
    text: string;
    options?: string[];
};

export type Quiz = {
    id: number;
    title: string;
    questions: Question[];
};
