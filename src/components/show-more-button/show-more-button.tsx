import { useAppDispatch } from '../../hooks/app-dispatch';
import { increaseDisplayedFilmsNumber } from '../../store/films-slice';

function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(increaseDisplayedFilmsNumber());
  }
  return (
    <button onClick={handleClick} className="catalog__button" type="button">
        Show more
    </button>
  );
}

export default ShowMoreButton;
