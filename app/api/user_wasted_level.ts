import { IFetch } from '@/app/api/fetch';

const WASTED_LEVELS_ENDPOINT = 'blitzed/user_wasted_level/';

export const createWastedLevel = async (wastedLevelData: any): Promise<any> => {
  try {
    const response = await IFetch<any>(WASTED_LEVELS_ENDPOINT, {
      method: 'POST',
      data: wastedLevelData,
    });
    return response;
  } catch (error) {
    console.error('Failed to create wasted level:', error);
    throw error;
  }
};

export const getWastedLevel = async (wastedLevelId: number): Promise<any> => {
  try {
    const response = await IFetch<any>(
      `${WASTED_LEVELS_ENDPOINT}${wastedLevelId}/`,
    );
    return response;
  } catch (error) {
    console.error('Failed to get wasted level:', error);
    throw error;
  }
};

export const getWastedLevels = async (): Promise<any> => {
  try {
    const response = await IFetch<any>(WASTED_LEVELS_ENDPOINT);
    return response;
  } catch (error) {
    console.error('Failed to get wasted levels:', error);
    throw error;
  }
};

export const updateWastedLevel = async (
  wastedLevelId: number,
  wastedLevelData: any,
): Promise<any> => {
  try {
    const response = await IFetch<any>(
      `${WASTED_LEVELS_ENDPOINT}${wastedLevelId}/`,
      {
        method: 'PUT',
        data: wastedLevelData,
      },
    );
    return response;
  } catch (error) {
    console.error('Failed to update wasted level:', error);
    throw error;
  }
};

export const deleteWastedLevel = async (
  wastedLevelId: number,
): Promise<any> => {
  try {
    const response = await IFetch<any>(
      `${WASTED_LEVELS_ENDPOINT}${wastedLevelId}/`,
      {
        method: 'DELETE',
      },
    );
    return response;
  } catch (error) {
    console.error('Failed to delete wasted level:', error);
    throw error;
  }
};
