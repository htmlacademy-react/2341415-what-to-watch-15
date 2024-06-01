import { ServerRoute } from '../const';
import { AuthData, User } from '../types';
import api from './api';
import { dropToken, saveToken } from './token';

export const userApi = {
  async login({ login, password }: AuthData): Promise<User> {
    const { data } = await api.post<User>(ServerRoute.LogIn, { email: login, password });
    saveToken(data.token);
    return data;
  },
  async logout() {
    try {
      await api.delete<User>(ServerRoute.Logout);
    } finally {
      dropToken();
    }
  },
  async getAuthorizedUser(): Promise<User> {
    try {
      const { data } = await api.get<User>(ServerRoute.LogIn);
      saveToken(data.token);
      return data;
    } catch (err) {
      dropToken();
      throw err;
    }
  }
} as const;

export type UserApi = typeof userApi;
