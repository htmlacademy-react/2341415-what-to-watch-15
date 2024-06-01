import Spinner from '../../components/spinner/spinner';
import { useAppSelector } from '../../hooks/hooks';
import { selectIsFilmNotFound, selectSelectedFilm } from '../../store/film-slice';
import NotFoundPage from '../not-found-page/not-found-page';
import AddReviewPage from './add-review-page';

function AddReviewPagePicker(): JSX.Element | null{

  const selectedFilm = useAppSelector(selectSelectedFilm);
  const isSelectedFilmNotFound = useAppSelector(selectIsFilmNotFound);

  if (selectedFilm?.id === undefined || isSelectedFilmNotFound) {
    return <NotFoundPage />;
  }

  if (selectedFilm === null) {
    return <Spinner />;
  }

  return <AddReviewPage selectedFilm={selectedFilm} />;
}

export default AddReviewPagePicker;
