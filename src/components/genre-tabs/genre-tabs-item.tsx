type Props = {
  genre: string;
};

function GenreTabsItem({ genre }: Props): JSX.Element {
  return (
    <li className="catalog__genres-item catalog__genres-item--active">
      <a href="#" className="catalog__genres-link">{genre}</a>
    </li>
  );
}

export default GenreTabsItem;
