import { useState, useCallback } from 'react';
import { createDrinkingGame, getDrinkingGameById, updateDrinkingGame, deleteDrinkingGame, fetchDrinkingGames } from '@/app/api/drinking_game';
import { CreateDrinkingGameRequest } from '@/app/api/drinking_game';
import { FETCH_STATUS } from '@/app/utils/constants';

export const useDrinkingGame = () => {
  const [drinkingGame, setDrinkingGame] = useState<any | null>(null);
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE);

  const create = useCallback(async (drinkingGameData: CreateDrinkingGameRequest) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await createDrinkingGame(drinkingGameData);
      setDrinkingGame(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to create drinking game:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const fetch = useCallback(async (drinkingGameId: number) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await getDrinkingGameById(drinkingGameId);
      setDrinkingGame(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to fetch drinking game:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const update = useCallback(async (drinkingGameId: number, drinkingGameData: any) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await updateDrinkingGame(drinkingGameId, drinkingGameData);
      setDrinkingGame(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to update drinking game:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const remove = useCallback(async (drinkingGameId: number) => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      await deleteDrinkingGame(drinkingGameId);
      setDrinkingGame(null);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to delete drinking game:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  const getDrinkingGames = useCallback(async () => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await fetchDrinkingGames();
      setDrinkingGame(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.error('Failed to fetch drinking games:', error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  return {
    drinkingGame,
    create,
    fetch,
    update,
    remove,
    status,
    getDrinkingGames,
  };
};
