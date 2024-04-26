import { MouseEventHandler } from 'react';
import { FilmTab } from '../../const';

type Props = {
  onTabClick: (tab: FilmTab) => void;
}

function FilmTabs({ onTabClick }:Props): JSX.Element {
  const handleClick: MouseEventHandler = (evt) => {
    evt.preventDefault();

    if (evt.target instanceof HTMLAnchorElement) {
      const newSelectedTab = evt.target.innerText as FilmTab;
      onTabClick(newSelectedTab);
    }
  };

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list" onClick={handleClick}>
        <li className="film-nav__item film-nav__item--active">
          <a href="#" className="film-nav__link">
            {FilmTab.OverView}
          </a>
        </li>
        <li className="film-nav__item">
          <a href="#" className="film-nav__link">
            {FilmTab.Details}
          </a>
        </li>
        <li className="film-nav__item">
          <a href="#" className="film-nav__link">
            {FilmTab.Reviews}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default FilmTabs;
