import FilmItemOfAList, { Props as FilmCardProps } from './film-item-of-a-list';

type Props = {
  films: (FilmCardProps & { id: string })[];
}

function FilmList({ films }: Props): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map(({ id, name, previewImage }) => <FilmItemOfAList key={id} name={name} previewImage={previewImage} id={id}/>)}
    </div>
  );
}

export default FilmList;
