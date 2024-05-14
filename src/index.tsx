import ReactDOM from 'react-dom/client';
import App from './app/app';
import { Provider } from 'react-redux';
import store from './store/store';
import { StrictMode } from 'react';
import { fetchFilmsAction } from './store/films-slice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilmsAction());

root.render(
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>
);

