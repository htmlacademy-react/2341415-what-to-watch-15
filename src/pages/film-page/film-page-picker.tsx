import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/app-dispatch';
import FilmPage from './film-page';
import { fetchFilmAction, selectIsFilmLoading, selectIsFilmNotFound, selectSelectedFilm } from '../../store/film-slice';
import { useEffect } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import { fetchSimilarFilmsAction, selectIsSimilarFilmsLoading, selectIsSimilarFilmsNotFound, selectSimilarFilms } from '../../store/similar-films-slice';
import { fetchCommentsAction } from '../../store/comments-slice';
import Spinner from '../../components/spinner/spinner';
import { selectErrorMessage } from '../../store/error-slice';

function FilmPagePicker(): JSX.Element | null{
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const selectedFilm = useAppSelector(selectSelectedFilm);
  const similarFilms = useAppSelector(selectSimilarFilms);
  const isSelectedFilmLoading = useAppSelector(selectIsFilmLoading);
  const isSimilarFilmsLoading = useAppSelector(selectIsSimilarFilmsLoading);
  const isSelectedFilmNotFound = useAppSelector(selectIsFilmNotFound);
  const isSimilarNotFound = useAppSelector(selectIsSimilarFilmsNotFound);
  const error = useAppSelector(selectErrorMessage);

  useEffect(
    () => {
      if (
        id
        && (selectedFilm === null || selectedFilm.id !== id)
        && isSelectedFilmLoading === false
        && isSelectedFilmNotFound !== true
        && error === null
      ) {
        dispatch(fetchFilmAction(id));
        dispatch(fetchSimilarFilmsAction(id));
        dispatch(fetchCommentsAction(id));
      }

    },
    [selectedFilm, id, isSelectedFilmLoading, isSelectedFilmNotFound, isSimilarFilmsLoading, isSimilarNotFound, dispatch, error]
  );

  if (isSelectedFilmLoading || isSimilarFilmsLoading) {
    return <Spinner />;
  }

  if (id === undefined || isSelectedFilmNotFound) {
    return <NotFoundPage />;
  }

  if (selectedFilm === null || error !== null) {
    return <Spinner />;
  }

  return <FilmPage selectedFilm={selectedFilm} similarFilms={similarFilms} />;
}

export default FilmPagePicker;
