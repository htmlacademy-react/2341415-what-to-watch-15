import { buildCreateSlice, asyncThunkCreator, PayloadAction } from '@reduxjs/toolkit';
import { Film, FilmListItem } from '../types';
import { films as filmList, promoFilm } from '../fake-data/films';
import { ALL_GENRES, DISPLAYED_FILMS_NUMBER_STEP } from '../const';
import { uniq } from 'lodash';
import { createSelector } from 'reselect';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type FilmsState = {
  films: FilmListItem[];
  promoFilm: Film;
  selectedGenre: string;
  displayedFilmsNumber: number;
  filteredFilms: FilmListItem[];
}

const initialState: FilmsState = {
  films: filmList,
  promoFilm: promoFilm,
  selectedGenre: ALL_GENRES,
  displayedFilmsNumber: DISPLAYED_FILMS_NUMBER_STEP,
  filteredFilms: filmList
};

const filmsSlice = createSliceWithThunks({
  name: 'films',
  initialState,
  selectors: {
    selectDisplayedFilms: createSelector(
      [
        (state: FilmsState) => state.filteredFilms,
        (state: FilmsState) => state.displayedFilmsNumber,
      ],
      (filteredFilms, displayedFilmsNumber) => filteredFilms.slice(0, displayedFilmsNumber)
    ),
    selectFilteredFilmsNumber: (state) => state.filteredFilms.length,
    selectPromoFilm: (state) => state.promoFilm,
    selectTotalFilmsNumber: (state) => state.films.length,
    selectDisplayedFilmsNumber: (state) => state.displayedFilmsNumber,
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
      const { payload: selectedGenre } = action;
      state.selectedGenre = selectedGenre;
      state.filteredFilms = selectedGenre === ALL_GENRES ? state.films : state.films.filter((film) => selectedGenre === film.genre);
    },
    increaseDisplayedFilmsNumber(state) {
      state.displayedFilmsNumber = Math.min(state.films.length, state.displayedFilmsNumber + DISPLAYED_FILMS_NUMBER_STEP);
    },
    resetDisplayedFilmsNumber(state) {
      state.displayedFilmsNumber = DISPLAYED_FILMS_NUMBER_STEP;
    }
  },
});

export default filmsSlice;
export const { selectPromoFilm, selectGenres, selectSelectedGenre, selectDisplayedFilms, selectDisplayedFilmsNumber, selectTotalFilmsNumber, selectFilteredFilmsNumber } = filmsSlice.selectors;
export const { setSelectedGenre, increaseDisplayedFilmsNumber, resetDisplayedFilmsNumber } = filmsSlice.actions;
