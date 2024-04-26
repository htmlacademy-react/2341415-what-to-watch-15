import { useNavigate } from 'react-router-dom';
import { FilmListItem } from '../../types';
import { AppRoute } from '../../const';

export type Props = Pick<FilmListItem, 'name' | 'previewImage' | 'id'>;

function FilmItemOfList({ name, previewImage, id }: Props): JSX.Element {

  const navigate = useNavigate();

  function handleClick() {
    navigate(`${AppRoute.Film}${id}`);
  }

  return (
    <article
      onClick={handleClick}
      className="small-film-card catalog__films-card"
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

export default FilmItemOfList;
