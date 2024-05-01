import { configureStore } from '@reduxjs/toolkit';
import filmsSlice from './films-slice';
import filmSlice from './film-slice';
import myListSlice from './my-list-slice';
import playerSlice from './player-slice';
import commentsSlice from './comments-slice';
import userSlice from './user-slice';

export type State = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    films: filmsSlice.reducer,
    promoFilm: filmsSlice.reducer,
    film: filmSlice.reducer,
    myList: myListSlice.reducer,
    player: playerSlice.reducer,
    comments: commentsSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
        },
      },
    }),
});

export default store;
