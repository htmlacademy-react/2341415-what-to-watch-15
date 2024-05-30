import { buildCreateSlice, asyncThunkCreator, PayloadAction } from '@reduxjs/toolkit';
import { TIMEOUT_SHOW_ERROR } from '../const';
import { getMessage } from '../services/handle-error';

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
  reducers: {
    setErrorMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    resetErrorMessage(state) {
      state.message = null;
    }
  },
});

export default errorSlice;

export const { selectErrorMessage } = errorSlice.selectors;

export const {
  setErrorMessage,
  resetErrorMessage
} = errorSlice.actions;

export const showErrorMessage = (err: unknown, dispatch: (action: unknown) => void) => {
  dispatch(setErrorMessage(getMessage(err)));
  setTimeout(
    () => {
      dispatch(resetErrorMessage());
    },
    TIMEOUT_SHOW_ERROR
  );
};
