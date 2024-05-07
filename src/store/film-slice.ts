import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { Film, FilmListItem } from '../types';
import { films, selectedFilm } from '../fake-data/films';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type FilmState = {
  selectedFilm: Film;
  similarFilms: FilmListItem[];
}

const initialState: FilmState = {
  selectedFilm: selectedFilm,
  similarFilms: films.slice(4, 8)
};

const filmSlice = createSliceWithThunks({
  name: 'film',
  initialState,
  selectors: {
    selectSelectedFilm: (state) => state.selectedFilm,
    selectSimilarFilms: (state) => state.similarFilms,
  },
  reducers: {},
});

export default filmSlice;
export const { selectSelectedFilm, selectSimilarFilms } = filmSlice.selectors;
