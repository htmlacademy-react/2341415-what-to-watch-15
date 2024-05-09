import { buildCreateSlice, asyncThunkCreator, PayloadAction } from '@reduxjs/toolkit';
import { Film, FilmListItem } from '../types';
import { films as filmList, promoFilm } from '../fake-data/films';
import { ALL_GENRES, DISPLAYED_FILMS_NUMBER } from '../const';
import { uniq } from 'lodash';
import { createSelector } from 'reselect';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type FilmsState = {
  films: FilmListItem[];
  promoFilm: Film;
  selectedGenre: string;
}

const initialState: FilmsState = {
  films: filmList,
  promoFilm: promoFilm,
  selectedGenre: ALL_GENRES
};

const filmsSlice = createSliceWithThunks({
  name: 'films',
  initialState,
  selectors: {
    // selectFilms: (state) => state.films,
    selectDisplayedFilms: createSelector(
      [
        (state: FilmsState) => state.films,
        (state: FilmsState) => state.selectedGenre,
      ],
      (films, selectedGenre) => {
        const filteredFilms = selectedGenre === ALL_GENRES ? films : films.filter((film) => selectedGenre === film.genre);
        return filteredFilms.slice(0, DISPLAYED_FILMS_NUMBER);
      }
    ),
    selectPromoFilm: (state) => state.promoFilm,
    // selectGenres: (state) => uniq(state.films.map((film) => film.genre)).sort(),
    selectGenres: createSelector(
      [
        (state: FilmsState) => state.films,
      ],
      (films) => uniq(films.map((film) => film.genre)).sort()
    ),
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
export const { selectPromoFilm, selectGenres, selectSelectedGenre, selectDisplayedFilms } = filmsSlice.selectors;
export const { setSelectedGenre } = filmsSlice.actions;
