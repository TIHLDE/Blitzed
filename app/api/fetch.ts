'use server'

import { ACCESS_TOKEN_COOKIE } from '@/lib/constants';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

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

  if (options?.withAuth) {
    const token = cookies().get(ACCESS_TOKEN_COOKIE)?.value;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
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
