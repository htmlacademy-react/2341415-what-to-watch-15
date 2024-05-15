import { ServerRoute } from '../const';
import { Film, FilmListItem, PromoFilm } from '../types';
import api from './api';

const filmsApi = {
  async getList(): Promise<FilmListItem[]> {
    const { data } = await api.get<FilmListItem[]>(ServerRoute.Films);
    return data;
  },

  async getPromo(): Promise<Film> {
    const { data: { id } } = await api.get<PromoFilm>(ServerRoute.Promo);
    return this.getFilm(id);
  },

  async getFilm(id: string): Promise<Film> {
    const { data } = await api.get<Film>(`${ServerRoute.Films}/${id}`);
    return data;
  },
} as const;

type FilmsApi = typeof filmsApi;

export {
  filmsApi,
};

export type {
  FilmsApi,
};
