import { useNavigate } from 'react-router-dom';
import { FilmListItem } from '../../types';
import { AppRoute } from '../../const';

export type Props = Pick<FilmListItem, 'name' | 'previewImage' | 'id'> & {
  onCardMouseEnter: (id: string) => void;
  onCardMouseLeave: () => void;
};

function FilmItemOfAList({ name, previewImage, id, onCardMouseEnter, onCardMouseLeave }: Props): JSX.Element {

  const navigate = useNavigate();

  function handleClick() {
    navigate(`${AppRoute.Film}${id}`);
  }

  return (
    <article
      onClick={handleClick}
      className="small-film-card catalog__films-card"
      onMouseEnter={() => onCardMouseEnter(id)}
      onMouseLeave={onCardMouseLeave}
    >
      <div className="small-film-card__image">
        <img
          src={previewImage}
          alt={name}
          width={280}
          height={175}
        />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">
          {name}
        </a>
      </h3>
    </article>
  );
}

export default FilmItemOfAList;
