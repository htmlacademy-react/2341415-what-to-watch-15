import GenreTabsItem from './genre-tabs-item';

type Props = {
  genres: string[];
};

function GenreTabs({ genres }: Props): JSX.Element {
  return (
    <ul className="catalog__genres-list">{genres.map((genre) => <GenreTabsItem key={genre} genre={genre} />)}</ul>
  );
}

export default GenreTabs;
