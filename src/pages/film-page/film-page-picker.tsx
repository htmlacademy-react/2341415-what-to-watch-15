import { useParams } from 'react-router-dom';

// import { ERROR, IS_LOADING, NOT_FOUND } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/app-dispatch';
// import NotFoundPage from '../error-screen/error-404-screen';
// import LoadingScreen from '../loading-screen/loading-screen';
// import OfferScreen from './offer-screen';
// import { fetchOfferCardDataAction, selectComments, selectNeighbours, selectSelectedOfferCard } from '../../store/offer-card-slice';
// import { useEffect } from 'react';
import FilmPage from './film-page';
import { fetchFilmAction, resetSelectedFilm, selectIsFilmLoading, selectIsFilmNotFound, selectSelectedFilm } from '../../store/film-slice';
import { useEffect } from 'react';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';

function FilmPagePicker(): JSX.Element | null{
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const selectedFilm = useAppSelector(selectSelectedFilm);
  const isLoading = useAppSelector(selectIsFilmLoading);
  const isNotFound = useAppSelector(selectIsFilmNotFound);
  // const neighbours = useAppSelector(selectNeighbours);
  // const comments = useAppSelector(selectComments);

  useEffect(
    () => {
      if (id && selectedFilm === null && isLoading === false) {
        dispatch(fetchFilmAction(id));
      }

      return () => {
        if (selectedFilm || isNotFound) {
          dispatch(resetSelectedFilm());
        }
      };
    },
    [selectedFilm, id, isLoading, isNotFound, dispatch]
  );

  if (id === undefined || isNotFound) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (selectedFilm === null) {
    return <LoadingPage />;
  }

  return <FilmPage selectedFilm={selectedFilm} />;
}

export default FilmPagePicker;
