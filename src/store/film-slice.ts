import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { Film } from '../types';
import { FilmsApi } from '../api/films-api';
import { isNotFoundError } from '../utils';
import { showErrorMessage } from './error-slice';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type FilmState = {
  selectedFilm: Film | null;
  isFilmLoading: boolean;
  notFound: boolean;
}

const initialState: FilmState = {
  selectedFilm: null,
  isFilmLoading: false,
  notFound: false,
};


export const FILM_SLICE_NAME = 'film';

const filmSlice = createSliceWithThunks({
  name: FILM_SLICE_NAME,
  initialState,
  selectors: {
    selectSelectedFilm: (state) => state.selectedFilm,
    selectIsFilmLoading: (state) => state.isFilmLoading,
    selectIsFilmNotFound: (state) => state.notFound,
  },
  reducers: (create) => ({
    fetchFilmAction: create.asyncThunk<Film, string, { extra: { filmsApi: FilmsApi }}>(
      (id, { extra: { filmsApi }, dispatch }) => filmsApi.getFilm(id).catch((err) => {
        showErrorMessage(err, dispatch);
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          state.selectedFilm = action.payload;
          state.isFilmLoading = false;
        },
        pending: (state) => {
          state.selectedFilm = null;
          state.isFilmLoading = true;
        },
        rejected: (state, action) => {
          if (isNotFoundError(action.error)) {
            state.notFound = true;
          }

          state.isFilmLoading = false;
        }
      }
    )
  }),
});

export default filmSlice;

export const {
  selectSelectedFilm,
  selectIsFilmLoading,
  selectIsFilmNotFound
} = filmSlice.selectors;

export const { fetchFilmAction } = filmSlice.actions;
