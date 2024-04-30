'use server'

import { IFetch } from '@/app/api/fetch';
import { ACCESS_TOKEN_COOKIE, USER_ID_COOKIE } from '@/lib/constants';
import User from '@/types/user';
import { cookies } from 'next/headers';


/**
 * Login user with user_id and password
*/
const loginUser = async (user_id: string, password: string): Promise<void> => {
    const url = 'auth/login/';
    const config = {
        method: 'POST',
        data: JSON.stringify({ user_id, password })
    };

    const response = await IFetch<{ token: User['token'] }>(url, config);

    cookies().set(ACCESS_TOKEN_COOKIE, response.token);
    cookies().set(USER_ID_COOKIE, user_id);
};


/**
 * Gets user data from backend, including image link, gender, and more.
*/
export const getUserData = async (user_id: User['user_id']) => {
    const url = `users/${user_id}`;
    return await IFetch<User>(url, { method: 'GET' });
};

/** 
 * Check if user is authenticated
*/
export const checkUserAuth = async (): Promise<boolean> => {
    const userId = cookies().get(USER_ID_COOKIE)?.value;
    const token = cookies().get(ACCESS_TOKEN_COOKIE)?.value;

    if (!userId || !token) return false;

    let userData: User;
    try {
        userData = await getUserData(userId);
    } catch (error) {
        return false;
    }

    return Boolean(userData?.first_name);
};


export default loginUser;