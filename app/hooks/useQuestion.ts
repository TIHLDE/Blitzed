import { useState, useCallback } from 'react';
import {
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from '@/app/api/question';
import { FETCH_STATUS } from '@/app/utils/constants';

export const useQuestion = () => {
  const [question, setQuestion] = useState<any | null>(null);
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE);

  const create = useCallback(async (text: string) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await createQuestion(text);
      setQuestion(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to create question:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const fetch = useCallback(async (questionId: number) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await getQuestionById(questionId);
      setQuestion(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to fetch question:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const update = useCallback(async (questionId: number, newText: string) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await updateQuestion(questionId, newText);
      setQuestion(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to update question:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const remove = useCallback(async (questionId: number) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      await deleteQuestion(questionId);
      setQuestion(null);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to delete question:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  return {
    question,
    create,
    fetch,
    update,
    remove,
    status,
  };
};
