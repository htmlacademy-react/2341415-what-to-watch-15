import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type UserState = {
  user: null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSliceWithThunks({
  name: 'user',
  initialState,
  selectors: {
    selectAuthStatus: () => AuthorizationStatus.Auth,
  },
  reducers: {},
});

export default userSlice;
// export const {
// } = filmsSlice.actions;
export const { selectAuthStatus } = userSlice.selectors;
