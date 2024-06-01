import { PayloadAction, asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { FilmsApi } from '../api/films-api';
import { showErrorMessage } from './error-slice';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type PlayerState = {
  videoLink: string;
}

const initialState: PlayerState = {
  videoLink: '',
};


export const PLAYER_SLICE_NAME = 'player';

const playerSlice = createSliceWithThunks({
  name: PLAYER_SLICE_NAME,
  initialState,
  selectors: {
    selectVideoLink: (state) => state.videoLink,
  },
  reducers: (create) => ({
    setVideoLink: create.reducer((state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.videoLink = payload;
    }),
    fetchVideoLinkAction: create.asyncThunk<string, string, { extra: { filmsApi: FilmsApi }}>(
      async (id, { extra: { filmsApi }, dispatch }) => {
        const film = await filmsApi.getFilm(id).catch((err) => {
          showErrorMessage(err, dispatch);
          throw err;
        });
        return film.videoLink;
      },
      {
        fulfilled: (state, action) => {
          const { payload: videoLink } = action;
          state.videoLink = videoLink;
        },
      }
    )
  }),
});

export default playerSlice;

export const {
  setVideoLink,
  fetchVideoLinkAction
} = playerSlice.actions;

export const { selectVideoLink } = playerSlice.selectors;
