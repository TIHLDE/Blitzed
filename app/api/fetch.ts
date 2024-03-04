import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getClientCookie } from '@/app/utils/stores/cookieStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/';

interface IFetchOptions extends Omit<AxiosRequestConfig, 'url'> {
  withAuth?: boolean;
  file?: File | File[] | Blob;
}

export const IFetch = async <T = any>(
  endpoint: string,
  options?: IFetchOptions,
): Promise<T> => {
  const headers: Record<string, string> = {};

  // TODO: Remove this
  // headers["x-csrf-token"] = "606d9b0894c798fa511d85f876fd8611b7109e32";

  if (options?.withAuth) {
    const token = getClientCookie('tokenDrinking');
    if (token) {
      headers['x-csrf-token'] = token;
    }
  }

  if (!options?.file) {
    headers['Content-Type'] = 'application/json';
  }

  const config: AxiosRequestConfig = {
    url: `${API_URL}${endpoint}`,
    ...options,
  };

  config.headers = { ...headers, ...(options?.headers ?? {}) };

  if (options?.file) {
    const formData = new FormData();

    if (Array.isArray(options.file)) {
      options.file.forEach((file) => formData.append('file', file));
    } else {
      formData.append('file', options.file);
    }

    config.data = formData;
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  const response: AxiosResponse<T> = await axios(config);
  return response.data;
};
