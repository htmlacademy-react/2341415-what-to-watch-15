import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationStatus, PageRoute } from '../const';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import FilmPagePicker from '../pages/film-page/film-page-picker';
import MyListPage from '../pages/my-list/my-list-page';
import LoginPage from '../pages/login-page/login-page';
import PlayerPage from '../pages/player/player.-page';
import AddReviewPage from '../pages/add-review-page/add-review-page';
import ConditionalRoute from '../components/conditional-route/conditional-route';
import { useAppSelector } from '../hooks/app-dispatch';
import { selectAuthStatus } from '../store/user-slice';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthStatus);

  function getInitializedAppRoutes() {
    return (
      <>
        <Route path={PageRoute.Main} element={<MainPage />} />
        <Route path={PageRoute.MyList} element={
          <ConditionalRoute
            condition={authorizationStatus === AuthorizationStatus.Auth}
            routOnFalse={PageRoute.Login}
          >
            <MyListPage />
          </ConditionalRoute>
        }
        />
        <Route path={PageRoute.Login} element={<LoginPage />} />
        <Route path={PageRoute.Film} element={<FilmPagePicker />} />
        <Route path={PageRoute.Player} element={<PlayerPage />} />
        <Route path={PageRoute.FilmReview} element={<AddReviewPage />}>
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
