import { useRef } from 'react';
import { useAppSelector } from '../../hooks/app-dispatch';
import { selectRunTime, selectVideoLink } from '../../store/player-slice';
import { getRunTime } from '../../utils';

function PlayerPage(): JSX.Element {

  const videoLink = useAppSelector(selectVideoLink);
  const vidRef = useRef<HTMLVideoElement>(null);
  const runTime = useAppSelector(selectRunTime);

  const handlePlayVideo = () => {
    if (vidRef.current) {
      vidRef.current.play();
    }
  };

  return (
    <div className="player">
      <video ref={vidRef} className="player__video" poster="img/player-poster.jpg" muted loop autoPlay>
        <source src={videoLink} type="video/mp4" />
      </video>
      <button type="button" className="player__exit">
        Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={30} max={100} />
            <div className="player__toggler" style={{ left: '30%' }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">{getRunTime(runTime)}</div>
        </div>
        <div className="player__controls-row">
          <button onClick={handlePlayVideo} type="button" className="player__play">
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
