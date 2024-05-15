import ReactDOM from 'react-dom/client';
import App from './app/app';
import { Provider } from 'react-redux';
import store from './store/store';
import { StrictMode } from 'react';
import { fetchFilmsAction, fetchPromoAction } from './store/films-slice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoAction());

root.render(
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>
);

