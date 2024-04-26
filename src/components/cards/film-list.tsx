import FilmItemOfList, { Props as FilmCardProps } from './film-item-of-list';

type Props = {
  films: (FilmCardProps & { id: string })[];
}

function FilmList({ films }: Props): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map(({ id, name, previewImage }) => <FilmItemOfList key={id} name={name} previewImage={previewImage} id={id}/>)}
    </div>
  );
}

export default FilmList;
