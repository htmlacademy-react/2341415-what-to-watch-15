import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { Film, FilmListItem } from '../types';
import { ALL_GENRES, DISPLAYED_FILMS_NUMBER_STEP } from '../const';
import { uniq } from 'lodash';
import { createSelector } from 'reselect';
import { FilmsApi } from '../services/films-api';
import { showErrorMessage } from './error-slice';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type FilmsState = {
  films: FilmListItem[];
  promoFilm: Film | null;
  selectedGenre: string;
  displayedFilmsNumber: number;
  filteredFilms: FilmListItem[];
  isFilmsLoading: boolean;
  isPromoFilmLoading: boolean;
}

const initialState: FilmsState = {
  films: [],
  promoFilm: null,
  selectedGenre: ALL_GENRES,
  displayedFilmsNumber: DISPLAYED_FILMS_NUMBER_STEP,
  filteredFilms: [],
  isFilmsLoading: false,
  isPromoFilmLoading: false,
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
    selectDisplayedFilmsNumber: (state) => state.displayedFilmsNumber,
    selectIsFilmsLoading: (state) => state.isFilmsLoading,
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
      async (_arg, { extra: { filmsApi }, dispatch }) => filmsApi.getList().catch((err) => {
        showErrorMessage(err, dispatch);
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          const { payload: films } = action;
          state.films = action.payload;
          state.filteredFilms = getFilteredFilmsByGenre(films, state.selectedGenre);
          state.isFilmsLoading = false;
        },
        pending: (state) => {
          state.isFilmsLoading = true;
        },
        rejected: (state) => {
          state.isFilmsLoading = false;
        }
      }
    ),
    fetchPromoAction: create.asyncThunk<Film, undefined, { extra: { filmsApi: FilmsApi }}>(
      (_arg, { extra: { filmsApi } }) => filmsApi.getPromo().catch((err) => {
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          state.promoFilm = action.payload;
          state.isPromoFilmLoading = false;
        },
        pending: (state) => {
          state.isPromoFilmLoading = true;
        },
        rejected: (state) => {
          state.isPromoFilmLoading = false;
        }
      }
    )
  }),
});

export default filmsSlice;

export const {
  selectPromoFilm,
  selectGenres,
  selectSelectedGenre,
  selectDisplayedFilms,
  selectDisplayedFilmsNumber,
  selectFilteredFilmsNumber,
  selectIsFilmsLoading,
} = filmsSlice.selectors;

export const {
  setSelectedGenre,
  increaseDisplayedFilmsNumber,
  resetDisplayedFilmsNumber,
  fetchFilmsAction,
  fetchPromoAction
} = filmsSlice.actions;
