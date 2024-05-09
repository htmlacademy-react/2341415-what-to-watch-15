import { useEffect } from 'react';
import FilmList from '../../components/cards/film-list';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import Footer from '../../components/footer/footer';
import GenreTabs from '../../components/genre-tabs/genre-tabs';
import Header from '../../components/header/header';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { ALL_GENRES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/app-dispatch';
import { selectPromoFilm, selectGenres, selectDisplayedFilms, selectTotalFilmsNumber, selectDisplayedFilmsNumber, resetDisplayedFilmsNumber } from '../../store/films-slice';

function MainPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const filmGenres = useAppSelector(selectGenres);
  const films = useAppSelector(selectDisplayedFilms);
  const promoFilm = useAppSelector(selectPromoFilm);
  const totalFilmsNumber = useAppSelector(selectTotalFilmsNumber);
  const displayedFilmsNumber = useAppSelector(selectDisplayedFilmsNumber);
  const isAllFilmDisplayed = totalFilmsNumber === displayedFilmsNumber;

  useEffect(() => () => {
    dispatch(resetDisplayedFilmsNumber());
  },[]);

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
