import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { FilmListItem } from '../types';
import { films } from '../fake-data/films';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type MyListState = {
  myList: FilmListItem[];
}

const initialState: MyListState = {
  myList: films.slice(0, 5),
};

const myListSlice = createSliceWithThunks({
  name: 'myList',
  initialState,
  selectors: {
    selectMyList: (state) => state.myList,
  },
  reducers: {},
});

export default myListSlice;
// export const {
// } = filmsSlice.actions;
export const { selectMyList } = myListSlice.selectors;
