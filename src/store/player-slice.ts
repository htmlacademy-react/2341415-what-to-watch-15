import { PayloadAction, asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { FilmsApi } from '../services/films-api';
import { setErrorMessage } from './error-slice';
import { getMessage } from '../services/handle-error';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type PlayerState = {
  videoLink: string;
  runTime: number;
}

const initialState: PlayerState = {
  videoLink: '',
  runTime: 0,
};

const playerSlice = createSliceWithThunks({
  name: 'player',
  initialState,
  selectors: {
    selectVideoLink: (state) => state.videoLink,
    selectRunTime: (state) => state.runTime,
  },
  reducers: (create) => ({
    setVideoParams: create.reducer((state, action: PayloadAction<{ videoLink: string; runTime: number }>) => {
      const { payload } = action;
      state.videoLink = payload.videoLink;
      state.runTime = payload.runTime;
    }),
    fetchPlayingFilmAction: create.asyncThunk<{ videoLink: string; runTime: number }, string, { extra: { filmsApi: FilmsApi }}>(
      async (id, { extra: { filmsApi }, dispatch }) => {
        const film = await filmsApi.getFilm(id).catch((err) => {
          dispatch(setErrorMessage(getMessage(err)));
          throw err;
        });
        return film;
      },
      {
        fulfilled: (state, action) => {
          const { payload: film} = action;
          state.runTime = film.runTime;
          state.videoLink = film.videoLink;
        },
      }
    )
  }),
});

export default playerSlice;
export const { setVideoParams, fetchPlayingFilmAction } = playerSlice.actions;
export const { selectVideoLink, selectRunTime } = playerSlice.selectors;
