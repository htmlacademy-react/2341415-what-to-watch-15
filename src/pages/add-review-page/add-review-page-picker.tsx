import { useAppSelector } from '../../hooks/app-dispatch';
import { selectSelectedFilm } from '../../store/film-slice';
import LoadingPage from '../loading-page/loading-page';
import AddReviewPage from './add-review-page';

function AddReviewPagePicker(): JSX.Element | null{

  const selectedFilm = useAppSelector(selectSelectedFilm);


  if (selectedFilm === null) {
    return <LoadingPage />;
  }

  return <AddReviewPage selectedFilm={selectedFilm} />;
}

export default AddReviewPagePicker;
