import { IFetch } from '@/app/api/fetch';

const SESSION_ENDPOINT = 'blitzed/session/';

export interface CreateSessionRequest {
  creator?: number;
  users?: number[];
  start_time?: string;
  end_time?: string;
}

export const createSession = async (sessionData: CreateSessionRequest): Promise<any> => {
  try {
    const response = await IFetch<any>(SESSION_ENDPOINT, {
      method: 'POST',
      data: sessionData,
    });
    return response;
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
};

export const getSessionById = async (sessionId: number): Promise<any> => {
  try {
    const response = await IFetch<any>(`${SESSION_ENDPOINT}${sessionId}/`);
    return response;
  } catch (error) {
    console.error('Failed to get session:', error);
    throw error;
  }
};

export const fetchSessions = async (): Promise<any> => {
  try {
    const response = await IFetch<any>(SESSION_ENDPOINT);
    return response;
  } catch (error) {
    console.error('Failed to get sessions:', error);
    throw error;
  }
};

export const updateSession = async (sessionId: number, sessionData: any): Promise<any> => {
  try {
    const response = await IFetch<any>(`${SESSION_ENDPOINT}${sessionId}/`, {
      method: 'PUT',
      data: sessionData,
    });
    return response;
  } catch (error) {
    console.error('Failed to update session:', error);
    throw error;
  }
};

export const deleteSession = async (sessionId: number): Promise<any> => {
  try {
    const response = await IFetch<any>(`${SESSION_ENDPOINT}${sessionId}/`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Failed to delete session:', error);
    throw error;
  }
};