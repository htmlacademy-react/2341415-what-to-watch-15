import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { Film, FilmListItem } from '../types';
import { promoFilm } from '../fake-data/films';
import { ALL_GENRES, DISPLAYED_FILMS_NUMBER_STEP } from '../const';
import { uniq } from 'lodash';
import { createSelector } from 'reselect';
import { FilmsApi } from '../services/films-api';

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
  films: [],
  promoFilm: promoFilm,
  selectedGenre: ALL_GENRES,
  displayedFilmsNumber: DISPLAYED_FILMS_NUMBER_STEP,
  filteredFilms: []
};

function getFilteredFilmsByGenre(films: FilmListItem[], genre: string): FilmListItem[] {
  return genre === ALL_GENRES ? films : films.filter((film) => genre === film.genre);
}

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
  reducers: (create) => ({
    setSelectedGenre: create.reducer<string>((state, action) => {
      const { payload: selectedGenre } = action;
      state.selectedGenre = selectedGenre;
      state.filteredFilms = getFilteredFilmsByGenre(state.films, selectedGenre);
    }),
    increaseDisplayedFilmsNumber: create.reducer((state) => {
      state.displayedFilmsNumber = Math.min(state.films.length, state.displayedFilmsNumber + DISPLAYED_FILMS_NUMBER_STEP);
    }),
    resetDisplayedFilmsNumber: create.reducer((state) => {
      state.displayedFilmsNumber = DISPLAYED_FILMS_NUMBER_STEP;
    }),
    fetchFilmsAction: create.asyncThunk<FilmListItem[], undefined, { extra: { filmsApi: FilmsApi }}>(
      async (_arg, { extra: { filmsApi } }) => filmsApi.getList().catch((err) => {
      // showErrorMessage('loading error', dispatch);
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          const { payload: films } = action;
          state.films = action.payload;
          state.filteredFilms = getFilteredFilmsByGenre(films, state.selectedGenre);
        },
      }
    ),
  }),
});

export default filmsSlice;
export const {
  selectPromoFilm,
  selectGenres,
  selectSelectedGenre,
  selectDisplayedFilms,
  selectDisplayedFilmsNumber,
  selectTotalFilmsNumber,
  selectFilteredFilmsNumber
} = filmsSlice.selectors;
export const { setSelectedGenre, increaseDisplayedFilmsNumber, resetDisplayedFilmsNumber, fetchFilmsAction } = filmsSlice.actions;
