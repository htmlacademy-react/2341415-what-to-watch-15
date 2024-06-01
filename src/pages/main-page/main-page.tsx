import { useEffect } from 'react';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import GenreTabs from '../../components/genre-tabs/genre-tabs';
import Header from '../../components/header/header';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { ALL_GENRES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectPromoFilm, selectGenres, selectDisplayedFilms, selectDisplayedFilmsNumber, resetDisplayedFilmsNumber, selectFilteredFilmsNumber } from '../../store/films-slice';
import PromoFilm from '../../components/promo-film/promo-film';

function MainPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const filmGenres = useAppSelector(selectGenres);
  const films = useAppSelector(selectDisplayedFilms);
  const promoFilm = useAppSelector(selectPromoFilm);
  const filteredFilmsNumber = useAppSelector(selectFilteredFilmsNumber);
  const displayedFilmsNumber = useAppSelector(selectDisplayedFilmsNumber);
  const isAllFilmDisplayed = filteredFilmsNumber <= displayedFilmsNumber;

  useEffect(() => () => {
    dispatch(resetDisplayedFilmsNumber());
  },[dispatch]);

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
          {promoFilm ? <PromoFilm promoFilm={promoFilm} /> : null}
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreTabs genres={[ALL_GENRES, ...filmGenres]} />
          <FilmList films={films} />
          <div className="catalog__more">
            {!isAllFilmDisplayed ? <ShowMoreButton /> : null}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
