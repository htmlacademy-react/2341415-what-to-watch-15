import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { Film } from '../types';
import { selectedFilm } from '../fake-data/films';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type FilmState = {
  selectedFilm: Film;
}

const initialState: FilmState = {
  selectedFilm: selectedFilm,
};

const filmSlice = createSliceWithThunks({
  name: 'film',
  initialState,
  selectors: {
    selectSelectedFilm: (state) => state.selectedFilm,
  },
  reducers: {},
});

export default filmSlice;
export const { selectSelectedFilm } = filmSlice.selectors;
