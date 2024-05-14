import { AppRoute } from '../const';
import { FilmListItem } from '../types';
import api from './api';

const filmsApi = {
  async getList(): Promise<FilmListItem[]> {
    const { data } = await api.get<FilmListItem[]>(AppRoute.Film);
    return data;
  }
} as const;

type FilmsApi = typeof filmsApi;

export {
  filmsApi,
};

export type {
  FilmsApi,
};
