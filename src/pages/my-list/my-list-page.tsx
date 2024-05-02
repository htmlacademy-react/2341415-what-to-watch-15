import FilmList from '../../components/cards/film-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/genre-tabs/header/header';
import { useAppSelector } from '../../hooks/app-dispatch';
import { selectMyList } from '../../store/my-list-slice';

function MyListPage(): JSX.Element {

  const myList = useAppSelector(selectMyList);

  return (
    <div className="user-page">
      <Header className='user-page__head'>{
        <h1 className="page-title user-page__title">
        My list <span className="user-page__film-count">{myList.length}</span>
        </h1>
      }
      </Header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList films={myList}/>
      </section>
      <Footer />
    </div>
  );
}

export default MyListPage;
