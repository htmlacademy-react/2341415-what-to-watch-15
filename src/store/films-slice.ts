import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { FilmListItem, PromoFilm } from '../types';
import { films, promoFilm } from '../fake-data/films';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type FilmsState = {
  films: FilmListItem[];
  promoFilm: PromoFilm;
}

const initialState: FilmsState = {
  films,
  promoFilm: promoFilm,
};

const filmsSlice = createSliceWithThunks({
  name: 'films',
  initialState,
  selectors: {
    selectFilms: (state) => state.films,
    selectPromoFilm: (state) => state.promoFilm,
  },
  reducers: {},
});

export default filmsSlice;
export const { selectFilms, selectPromoFilm } = filmsSlice.selectors;
