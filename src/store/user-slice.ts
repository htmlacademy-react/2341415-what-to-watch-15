import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { AuthData, User } from '../types';
import { getToken } from '../services/token';
import { UserApi } from '../services/user-api';
import { handleError } from '../services/handle-error';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type UserState = {
  user: User | null;
  token: string | null;
  isUserLoading: boolean;
}

const initialState: UserState = {
  user: null,
  token: getToken(),
  isUserLoading: false,
};

const userSlice = createSliceWithThunks({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectAuthorizationStatus: (state) => {
      if (state.user) {
        return AuthorizationStatus.Auth;
      }

      if (state.token) {
        return AuthorizationStatus.Unknown;
      }

      return AuthorizationStatus.NoAuth;
    },
  },
  reducers: (create) => ({
    loginAction: create.asyncThunk<User, AuthData , { extra: { userApi: UserApi }}>(
      (authData, { extra: { userApi } }) => userApi.login(authData).catch((err) => {
        handleError(err);
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          state.user = action.payload;
          state.isUserLoading = true;
        },
      }
    ),
    logoutAction: create.asyncThunk<void, undefined , { extra: { userApi: UserApi }}>(
      (_arg, { extra: { userApi } }) => userApi.logout().catch((err) => {
        throw err;
      }),
      {
        fulfilled: (state) => {
          state.user = null;
          state.token = null;
        },
      }
    ),
    checkAuthAction: create.asyncThunk<User | null, undefined, { extra: { userApi: UserApi } }>(
      async (_arg, { extra: { userApi }, getState }) => {
        const state = getState() as { user: UserState };

        if(!state.user.token) {
          return null;
        }

        return userApi.getAuthorizedUser().then((user) => user).catch(() => null);
      },
      {
        fulfilled: (state, action) => {
          state.user = action.payload;
        },
        pending: (state) => {
          state.isUserLoading = true;
        },
      }
    ),
  }),
});

export default userSlice;
export const { selectAuthorizationStatus, selectUser } = userSlice.selectors;
export const { loginAction, logoutAction, checkAuthAction } = userSlice.actions;
