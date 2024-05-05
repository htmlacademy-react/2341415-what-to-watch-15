import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type PlayerState = {
  videoLink: string;
  runTime: number;
}

const initialState: PlayerState = {
  videoLink: '',
  runTime: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  selectors: {
    selectVideoLink: (state) => state.videoLink,
    selectRunTime: (state) => state.runTime,
  },
  reducers: {
    setVideoParams(state, action: PayloadAction<{ videoLink: string; runTime: number }>) {
      const { payload } = action;
      state.videoLink = payload.videoLink;
      state.runTime = payload.runTime;
    }
  },
});

export default playerSlice;
export const { setVideoParams } = playerSlice.actions;
export const { selectVideoLink, selectRunTime } = playerSlice.selectors;
