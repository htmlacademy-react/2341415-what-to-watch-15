import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageRoute } from '../const';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import FilmPagePicker from '../pages/film-page/film-page-picker';
import MyListPage from '../pages/my-list/my-list-page';
import LoginPage from '../pages/login-page/login-page';
import PlayerPage from '../pages/player/player.-page';

function App(): JSX.Element {

  function getInitializedAppRoutes() {
    return (
      <>
        <Route path={PageRoute.Main} element={<MainPage />} />
        <Route path={PageRoute.MyList} element={<MyListPage />} />
        <Route path={PageRoute.Login} element={<LoginPage />} />
        <Route path={PageRoute.Film} element={<FilmPagePicker />} />
        <Route path={PageRoute.Player} element={<PlayerPage />}>
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
