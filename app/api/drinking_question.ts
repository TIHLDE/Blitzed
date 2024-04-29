import { IFetch } from '@/app/api/fetch';

const DRINKING_QUESTION_ENDPOINT = 'blitzed/question/';


export interface CreateQuestionRequest {
    text?: string;
};

export interface QuestionResponse {
    text: string;
    id: string;
    drinking_game: number;
};

export const createDrinkingQuestion = async (
    drinkingQuestionData: CreateQuestionRequest
): Promise<QuestionResponse> => {
    try {
        const response = await IFetch<QuestionResponse>(DRINKING_QUESTION_ENDPOINT, {
            method: 'POST',
            data: drinkingQuestionData
        });
        
        console.log(response)

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};