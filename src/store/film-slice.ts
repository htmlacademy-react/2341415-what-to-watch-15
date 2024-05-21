import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { Film } from '../types';
import { FilmsApi } from '../services/films-api';
import { isNotFoundError } from '../utils';

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

const filmSlice = createSliceWithThunks({
  name: 'film',
  initialState,
  selectors: {
    selectSelectedFilm: (state) => state.selectedFilm,
    selectIsFilmLoading: (state) => state.isFilmLoading,
    selectIsFilmNotFound: (state) => state.notFound,
  },
  reducers: (create) => ({
    resetSelectedFilm: create.reducer((state) => {
      state.selectedFilm = null;
      state.notFound = false;
    }),
    fetchFilmAction: create.asyncThunk<Film, string, { extra: { filmsApi: FilmsApi }}>(
      (id, { extra: { filmsApi } }) => filmsApi.getFilm(id).catch((err) => {
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
export const { selectSelectedFilm, selectIsFilmLoading, selectIsFilmNotFound } = filmSlice.selectors;
export const { resetSelectedFilm, fetchFilmAction } = filmSlice.actions;
