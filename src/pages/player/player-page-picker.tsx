import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/app-dispatch';
import { useEffect } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import PlayerPage from './player-page';
import { fetchPlayingFilmAction, selectVideoLink } from '../../store/player-slice';
import Spinner from '../../components/spinner/spinner';

function PlayerPagePicker(): JSX.Element | null{
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const videoLink = useAppSelector(selectVideoLink);

  useEffect(
    () => {
      if(id && !videoLink) {
        dispatch(fetchPlayingFilmAction(id));
      }
    },
    [id, videoLink, dispatch]
  );

  if (id === undefined) {
    return <NotFoundPage />;
  }

  if (!videoLink) {
    return <Spinner />;
  }

  return <PlayerPage />;
}

export default PlayerPagePicker;
