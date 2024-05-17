type CommonFilmData = {
  id: string;
  name: string;
  genre: string;
};

export type FilmListItem = CommonFilmData & {
  previewImage: string;
  previewVideoLink: string;
};

export type PromoFilm = CommonFilmData & {
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  released: number;
  isFavorite: boolean;
};

export type Film = PromoFilm & {
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
};

export type Comment = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
};

export type User = {
  email: string;
  token: string;
  name: string;
  avatarUrl: string;
};

export type AuthData = {
  login: string;
  password: string;
};
