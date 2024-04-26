import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageRoute } from '../const';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import FilmPagePicker from '../pages/film-page/film-page-picker';

function App(): JSX.Element {

  function getInitializedAppRoutes() {
    return (
      <>
        <Route path={PageRoute.Main} element={<MainPage />}>
          <Route index element={<MainPage />} />
        </Route>
        <Route path={PageRoute.Film} element={<FilmPagePicker />}>
          <Route index element={<FilmPagePicker />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {getInitializedAppRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
