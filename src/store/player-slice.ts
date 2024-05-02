import { buildCreateSlice, asyncThunkCreator, PayloadAction } from '@reduxjs/toolkit';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type PlayerState = {
  videoLink: string;
}

const initialState: PlayerState = {
  videoLink: '',
};

const playerSlice = createSliceWithThunks({
  name: 'player',
  initialState,
  selectors: {
    selectVideoLink: (state) => state.videoLink,
  },
  reducers: {
    setVideoLink(state, action: PayloadAction<string>) {
      state.videoLink = action.payload;
    }
  },
});

export default playerSlice;
export const { setVideoLink } = playerSlice.actions;
export const { selectVideoLink } = playerSlice.selectors;
