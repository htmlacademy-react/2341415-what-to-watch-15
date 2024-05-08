import { buildCreateSlice, asyncThunkCreator, PayloadAction } from '@reduxjs/toolkit';
import { Film, FilmListItem } from '../types';
import { films, promoFilm } from '../fake-data/films';
import { ALL_GENRES } from '../const';
import { uniq } from 'lodash';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type FilmsState = {
  films: FilmListItem[];
  promoFilm: Film;
  selectedGenre: string;
}

const initialState: FilmsState = {
  films,
  promoFilm: promoFilm,
  selectedGenre: ALL_GENRES
};

const filmsSlice = createSliceWithThunks({
  name: 'films',
  initialState,
  selectors: {
    selectFilms: (state) => state.films,
    selectPromoFilm: (state) => state.promoFilm,
    selectGenres: (state) => uniq(state.films.map((film) => film.genre)).sort(),
    selectSelectedGenre: (state) => state.selectedGenre
  },
  reducers: {
    setSelectedGenre(state, action: PayloadAction<string>) {
      const { payload } = action;
      state.selectedGenre = payload;
    }
  },
});

export default filmsSlice;
export const { selectFilms, selectPromoFilm, selectGenres, selectSelectedGenre } = filmsSlice.selectors;
export const { setSelectedGenre } = filmsSlice.actions;
