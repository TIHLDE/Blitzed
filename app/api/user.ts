import { IFetch } from '@/app/api/fetch';

const API_URL = 'http://localhost:8000/';
const AUTH_ENDPOINT = 'auth';

interface LoginRequestResponse {
  token?: string;
  user?: any;
}

export const authenticate = async (
  username: string,
  password: string,
): Promise<LoginRequestResponse> => {
  const endpoint = `${AUTH_ENDPOINT}/login/`;

  const data = {
    user_id: username,
    password: password,
  };

  const response = await IFetch<LoginRequestResponse>(endpoint, {
    method: 'POST',
    data: data,
  });

  return response;
};
