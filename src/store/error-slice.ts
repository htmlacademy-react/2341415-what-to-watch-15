import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { TIMEOUT_SHOW_ERROR } from '../const';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type ErrorState = {
  message: string | null;
}

const initialState: ErrorState = {
  message: null,
};

const errorSlice = createSliceWithThunks({
  name: 'error',
  initialState,
  selectors: {
    selectErrorMessage: (state) => state.message,
  },
  reducers: (create) => ({
    setErrorMessage: create.reducer<string | null>((state, action) => {
      state.message = action.payload;
    }),
    resetErrorMessage: create.asyncThunk<void, undefined, { extra: object }>(
      (_arg, { dispatch }) => {
        setTimeout(
          () => dispatch(errorSlice.actions.setErrorMessage(null)),
          TIMEOUT_SHOW_ERROR,
        );
      }
    ),
  }),
});

export default errorSlice;
export const { selectErrorMessage } = errorSlice.selectors;
export const { setErrorMessage, resetErrorMessage } = errorSlice.actions;
