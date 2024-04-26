import { useAppSelector } from '../../hooks/app-dispatch';
import FilmPage from './film-page';
import { selectSelectedFilm } from '../../store/film-slice';

function FilmPagePicker(): JSX.Element | null{
  const selectedFilm = useAppSelector(selectSelectedFilm);

  return <FilmPage selectedFilm={selectedFilm} />;
}

export default FilmPagePicker;
