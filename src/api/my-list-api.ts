import { ServerRoute } from '../const';
import { FilmListItem } from '../types';
import api from './api';

const myListApi = {
  async getList(): Promise<FilmListItem[]> {
    const { data } = await api.get<FilmListItem[]>(ServerRoute.Favorites);
    return data;
  },

  async changeIsFavorite(id: string, isFavorite: boolean): Promise<FilmListItem & { isFavorite: boolean }> {
    const { data } = await api.post<FilmListItem & { isFavorite: boolean }>(`${ServerRoute.Favorites}/${id}/${isFavorite ? 1 : 0}`);
    return data;
  }

} as const;

type MyListApi = typeof myListApi;

export {
  myListApi,
};

export type {
  MyListApi,
};
