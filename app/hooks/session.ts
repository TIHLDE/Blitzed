import { useState, useCallback } from 'react';
import { createSession, getSessionById, updateSession, deleteSession, fetchSessions } from '@/app/api/session';
import { CreateSessionRequest } from '@/app/api/session';
import { FETCH_STATUS } from '@/app/utils/constants';

export const useSession = () => {
  const [session, setSession] = useState<any | null>(null);
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE);

  const create = useCallback(async (sessionData: CreateSessionRequest) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await createSession(sessionData);
      setSession(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to create session:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const fetch = useCallback(async (sessionId: number) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await getSessionById(sessionId);
      setSession(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const update = useCallback(async (sessionId: number, sessionData: any) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await updateSession(sessionId, sessionData);
      setSession(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to update session:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const remove = useCallback(async (sessionId: number) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      await deleteSession(sessionId);
      setSession(null);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to delete session:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const getSessions = useCallback(async () => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await fetchSessions();
      setSession(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }
  , []);

  return {
    session,
    create,
    fetch,
    update,
    remove,
    status,
    getSessions,
  };
};
