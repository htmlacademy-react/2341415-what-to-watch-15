import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/app-dispatch';
import { setVideoParams } from '../../store/player-slice';

type Props = {
  id: string;
  videoLink: string;
  runTime: number;
};

function FilmCardButtons({ id, videoLink, runTime }: Props): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleClickPlayer() {
    dispatch(setVideoParams({ videoLink, runTime }));
    navigate(`${AppRoute.Player}${id}`);
  }

  function handleClickMyList() {
    navigate(AppRoute.MyList);
  }

  return (
    <>
      <button onClick={handleClickPlayer} className="btn btn--play film-card__button" type="button">
        <svg viewBox="0 0 19 19" width={19} height={19}>
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </button>
      <button onClick={handleClickMyList} className="btn btn--list film-card__button" type="button">
        <svg viewBox="0 0 19 20" width={19} height={20}>
          <use xlinkHref="#add" />
        </svg>
        <span>My list</span>
        <span className="film-card__count">9</span>
      </button>
    </>
  );
}

export default FilmCardButtons;
