import FilmList from '../../components/cards/film-list';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import Footer from '../../components/footer/footer';
import GenreTabs from '../../components/genre-tabs/genre-tabs';
import Header from '../../components/genre-tabs/header/header';
import { useAppSelector } from '../../hooks/app-dispatch';
import { selectPromoFilm, selectFilms } from '../../store/films-slice';

function MainPage(): JSX.Element {
  const genres = [
    'All genres',
    'Comedies',
    'Crime',
    'Documentary',
    'Dramas',
    'Horror',
    'Kids &amp; Family',
    'Romance',
    'Sci-Fi',
    'Thrillers',
  ];

  const films = useAppSelector(selectFilms);
  const promoFilm = useAppSelector(selectPromoFilm);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header className='film-card__head'>{null}</Header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <FilmCardButtons id={promoFilm.id} videoLink={promoFilm.videoLink} runTime={promoFilm.runTime} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreTabs genres={genres} />
          <FilmList films={films} />
          <div className="catalog__more">
            <button className="catalog__button" type="button">
              Show more
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </>

  );
}

export default MainPage;
