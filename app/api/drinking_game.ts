import { IFetch } from '@/app/api/fetch';

const DRINKING_GAME_ENDPOINT = 'blitzed/drinking_game/';

export interface CreateDrinkingGameRequest {
  name?: string;
  description?: string;
  image?: string;
}

export interface DrinkingGameResponse {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const createDrinkingGame = async (
  drinkingGameData: CreateDrinkingGameRequest,
): Promise<DrinkingGameResponse> => {
  try {
    const response = await IFetch<DrinkingGameResponse>(DRINKING_GAME_ENDPOINT, {
      method: 'POST',
      data: drinkingGameData,
      withAuth: true
    });
    console.log(response)
    return response;
  } catch (error) {
    console.error('Failed to create drinking game:', error);
    throw error;
  }
};

export const getDrinkingGameById = async (
  drinkingGameId: number,
): Promise<DrinkingGameResponse> => {
  try {
    const response = await IFetch<any>(
      `${DRINKING_GAME_ENDPOINT}${drinkingGameId}/`,
    );
    return response;
  } catch (error) {
    console.error('Failed to get drinking game:', error);
    throw error;
  }
};

export const fetchDrinkingGames = async (): Promise<any> => {
  try {
    const response = await IFetch<any>(DRINKING_GAME_ENDPOINT);
    return response;
  } catch (error) {
    console.error('Failed to fetch drinking games:', error);
    throw error;
  }
};

export const updateDrinkingGame = async (
  drinkingGameId: number,
  drinkingGameData: any,
): Promise<any> => {
  try {
    const response = await IFetch<any>(
      `${DRINKING_GAME_ENDPOINT}${drinkingGameId}/`,
      {
        method: 'PUT',
        data: drinkingGameData,
      },
    );
    return response;
  } catch (error) {
    console.error('Failed to update drinking game:', error);
    throw error;
  }
};

export const deleteDrinkingGame = async (
  drinkingGameId: number,
): Promise<any> => {
  try {
    const response = await IFetch<any>(
      `${DRINKING_GAME_ENDPOINT}${drinkingGameId}/`,
      {
        method: 'DELETE',
      },
    );
    return response;
  } catch (error) {
    console.error('Failed to delete drinking game:', error);
    throw error;
  }
};
