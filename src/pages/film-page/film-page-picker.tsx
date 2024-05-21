import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/app-dispatch';
import FilmPage from './film-page';
import { fetchFilmAction, selectIsFilmLoading, selectIsFilmNotFound, selectSelectedFilm } from '../../store/film-slice';
import { useEffect } from 'react';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import { fetchSimilarFilmsAction, selectIsSimilarFilmsLoading, selectIsSimilarFilmsNotFound, selectSimilarFilms } from '../../store/similar-films-slice';
import { fetchCommentsAction } from '../../store/comments-slice';

function FilmPagePicker(): JSX.Element | null{
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const selectedFilm = useAppSelector(selectSelectedFilm);
  const similarFilms = useAppSelector(selectSimilarFilms);
  const isSelectedFilmLoading = useAppSelector(selectIsFilmLoading);
  const isSimilarFilmsLoading = useAppSelector(selectIsSimilarFilmsLoading);
  const isSelectedFilmNotFound = useAppSelector(selectIsFilmNotFound);
  const isSimilarNotFound = useAppSelector(selectIsSimilarFilmsNotFound);

  useEffect(
    () => {
      if (
        id
        && (selectedFilm === null || selectedFilm.id !== id)
        && isSelectedFilmLoading === false
        && isSelectedFilmNotFound !== true
      ) {
        dispatch(fetchFilmAction(id));
        dispatch(fetchSimilarFilmsAction(id));
        dispatch(fetchCommentsAction(id));
      }
    },
    [selectedFilm, id, isSelectedFilmLoading, isSelectedFilmNotFound, isSimilarFilmsLoading, isSimilarNotFound, dispatch]
  );

  if (isSelectedFilmLoading || isSimilarFilmsLoading) {
    return <LoadingPage />;
  }

  if (id === undefined || isSelectedFilmNotFound) {
    return <NotFoundPage />;
  }

  if (selectedFilm === null) {
    return <LoadingPage />;
  }

  return <FilmPage selectedFilm={selectedFilm} similarFilms={similarFilms} />;
}

export default FilmPagePicker;
