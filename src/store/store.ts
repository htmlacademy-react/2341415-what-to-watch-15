import { configureStore } from '@reduxjs/toolkit';
import filmsSlice from './films-slice';
import filmSlice from './film-slice';
import myListSlice from './my-list-slice';
import playerSlice from './player-slice';
import commentsSlice from './comments-slice';
import userSlice from './user-slice';
import { filmsApi } from '../services/films-api';
import { userApi } from '../services/user-api';
import errorSlice from './error-slice';
import similarFilmsSlice from './similar-films-slice';
import { commentsApi } from '../services/comments-api';
import { myListApi } from '../services/my-list-api';

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
    error: errorSlice.reducer,
    similarFilms: similarFilmsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          filmsApi,
          userApi,
          commentsApi,
          myListApi
        },
      },
    }),
});

export default store;
