import { useState, useCallback } from 'react';
import {
  createWastedLevel,
  getWastedLevel,
  getWastedLevels,
  updateWastedLevel,
  deleteWastedLevel,
} from '@/app/api/user_wasted_level';
import { FETCH_STATUS } from '@/app/utils/constants';

export const useWastedLevel = () => {
  const [wastedLevel, setWastedLevel] = useState<any | null>(null);
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE);

  const create = useCallback(async (wastedLevelData: any) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await createWastedLevel(wastedLevelData);
      setWastedLevel(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to create wasted level:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const fetch = useCallback(async (wastedLevelId: number) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await getWastedLevel(wastedLevelId);
      setWastedLevel(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to fetch wasted level:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const update = useCallback(
    async (wastedLevelId: number, wastedLevelData: any) => {
      setStatus(FETCH_STATUS.LOADING);
      try {
        const data = await updateWastedLevel(wastedLevelId, wastedLevelData);
        setWastedLevel(data);
        setStatus(FETCH_STATUS.SUCCESS);
      } catch (error) {
        console.error('Failed to update wasted level:', error);
        setStatus(FETCH_STATUS.ERROR);
      }
    },
    [],
  );

  const remove = useCallback(async (wastedLevelId: number) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      await deleteWastedLevel(wastedLevelId);
      setWastedLevel(null);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to delete wasted level:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const getWastedLevelsList = useCallback(async () => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await getWastedLevels();
      setWastedLevel(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to fetch wasted levels:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  return {
    wastedLevel,
    create,
    fetch,
    update,
    remove,
    status,
    getWastedLevels: getWastedLevelsList,
  };
};
