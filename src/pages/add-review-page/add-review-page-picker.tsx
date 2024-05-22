import { useAppSelector } from '../../hooks/app-dispatch';
import { selectIsFilmNotFound, selectSelectedFilm } from '../../store/film-slice';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import AddReviewPage from './add-review-page';

function AddReviewPagePicker(): JSX.Element | null{

  const selectedFilm = useAppSelector(selectSelectedFilm);
  const isSelectedFilmNotFound = useAppSelector(selectIsFilmNotFound);

  if (selectedFilm?.id === undefined || isSelectedFilmNotFound) {
    return <NotFoundPage />;
  }

  if (selectedFilm === null) {
    return <LoadingPage />;
  }

  return <AddReviewPage selectedFilm={selectedFilm} />;
}

export default AddReviewPagePicker;
