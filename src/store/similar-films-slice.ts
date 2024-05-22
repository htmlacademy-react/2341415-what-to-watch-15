import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { FilmListItem } from '../types';
import { FilmsApi } from '../services/films-api';
import { setErrorMessage } from './error-slice';
import { getMessage } from '../services/handle-error';
import { isNotFoundError } from '../utils';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type SimilarFilmsState = {
  similarFilms: FilmListItem[];
  isSimilarFilmsLoading: boolean;
  notFoundSimilar: boolean;
}

const initialState: SimilarFilmsState = {
  similarFilms: [],
  isSimilarFilmsLoading: false,
  notFoundSimilar: false,
};

const similarFilmsSlice = createSliceWithThunks({
  name: 'similarFilms',
  initialState,
  selectors: {
    selectSimilarFilms: (state) => state.similarFilms,
    selectIsSimilarFilmsLoading: (state) => state.isSimilarFilmsLoading,
    selectIsSimilarFilmsNotFound: (state) => state.notFoundSimilar,
  },
  reducers: (create) => ({
    resetSimilarFilms: create.reducer((state) => {
      state.similarFilms = [];
      state.notFoundSimilar = false;
    }),
    fetchSimilarFilmsAction: create.asyncThunk<FilmListItem[], string, { extra: { filmsApi: FilmsApi }}>(
      async (id, { extra: { filmsApi }, dispatch }) => filmsApi.getSimilar(id).catch((err) => {
        dispatch(setErrorMessage(getMessage(err)));
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          state.similarFilms = action.payload;
          state.isSimilarFilmsLoading = false;
        },
        pending: (state) => {
          state.similarFilms = [];
          state.isSimilarFilmsLoading = true;
        },
        rejected: (state, action) => {
          if (isNotFoundError(action.error)) {
            state.notFoundSimilar = true;
          }

          state.isSimilarFilmsLoading = false;
        }
      }
    ),
  }),
});

export default similarFilmsSlice;
export const { selectSimilarFilms, selectIsSimilarFilmsLoading, selectIsSimilarFilmsNotFound } = similarFilmsSlice.selectors;
export const { fetchSimilarFilmsAction, resetSimilarFilms } = similarFilmsSlice.actions;
