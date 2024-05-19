import { resetErrorMessage, setErrorMessage } from '../store/error-slice';
import store from '../store/store';

export const handleError = (err?: unknown): void => {
  if (err instanceof String) {
    store.dispatch(setErrorMessage(err.toString()));
  } else if (err instanceof Error) {
    store.dispatch(setErrorMessage(err.message));
  } else {
    store.dispatch(setErrorMessage('unknown error'));
  }

  store.dispatch(resetErrorMessage());
};
