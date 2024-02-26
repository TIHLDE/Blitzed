import { IFetch } from '@/app/api/fetch';

const QUESTION_ENDPOINT = 'blitzed/question/';

export const createQuestion = async (questionData: {
  text: string;
}): Promise<any> => {
  try {
    const response = await IFetch<any>(QUESTION_ENDPOINT, {
      method: 'POST',
      data: questionData,
    });
    return response;
  } catch (error) {
    console.error('Failed to create question:', error);
    throw error;
  }
};

export const getQuestionById = async (questionId: number): Promise<any> => {
  try {
    const response = await IFetch<any>(`${QUESTION_ENDPOINT}${questionId}/`);
    return response;
  } catch (error) {
    console.error('Failed to get question:', error);
    throw error;
  }
};

export const fetchQuestions = async (): Promise<any> => {
  try {
    const response = await IFetch<any>(QUESTION_ENDPOINT);
    return response;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};

export const updateQuestion = async (
  questionId: number,
  questionData: any,
): Promise<any> => {
  try {
    const response = await IFetch<any>(`${QUESTION_ENDPOINT}${questionId}/`, {
      method: 'PUT',
      data: questionData,
    });
    return response;
  } catch (error) {
    console.error('Failed to update question:', error);
    throw error;
  }
};

export const deleteQuestion = async (questionId: number): Promise<any> => {
  try {
    const response = await IFetch<any>(`${QUESTION_ENDPOINT}${questionId}/`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Failed to delete question:', error);
    throw error;
  }
};
