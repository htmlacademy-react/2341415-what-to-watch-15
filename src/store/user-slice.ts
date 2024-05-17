import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { User } from '../types';
import { getToken } from '../services/token';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type UserState = {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: getToken(),
};

const userSlice = createSliceWithThunks({
  name: 'user',
  initialState,
  selectors: {
    selectAuthStatus: () => AuthorizationStatus.Auth,
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
  reducers: {},
});

export default userSlice;
export const { selectAuthStatus } = userSlice.selectors;
