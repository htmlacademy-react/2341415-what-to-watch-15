import { useState } from 'react';
import FilmTabs from '../../components/film-tabs/film-tabs';
import Footer from '../../components/footer/footer';
import Header from '../../components/genre-tabs/header/header';
import { Film } from '../../types';
import { AppRoute, FilmTab } from '../../const';
import FilmOverview from '../../components/film-tabs/film-overview';
import FilmDetails from '../../components/film-tabs/film-details';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import CommentsList from '../../components/comments/comment-list';
import { useAppSelector } from '../../hooks/app-dispatch';
import { selectComments } from '../../store/comments-slice';
import { Link } from 'react-router-dom';
import FilmList from '../../components/cards/film-list';
import { selectSimilarFilms } from '../../store/film-slice';

type Props = {
  selectedFilm: Film;
};

function FilmPage({ selectedFilm }: Props): JSX.Element {
  const { name, genre, released, posterImage, backgroundImage, id } = selectedFilm;
  const [selectedTab, setSelectedTab] = useState<FilmTab>(FilmTab.OverView);
  const reviews = useAppSelector(selectComments);
  const similarFilms = useAppSelector(selectSimilarFilms);

  function getTabContent(tab: FilmTab): JSX.Element {
    if(tab === FilmTab.OverView) {
      return <FilmOverview selectedFilm={selectedFilm} />;
    }
    if(tab === FilmTab.Details) {
      return <FilmDetails selectedFilm={selectedFilm} />;
    }
    return <CommentsList reviews={reviews} />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={backgroundImage}
              alt={name}
            />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header className='film-card__head'>{null}</Header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <FilmCardButtons id={id} videoLink={selectedFilm.videoLink} runTime={selectedFilm.runTime}/>
                <Link to={`${AppRoute.Film}${selectedFilm.id}${AppRoute.FilmReview}`} className="btn film-card__button">
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={posterImage}
                alt={`${name} poster`}
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <FilmTabs onTabClick={setSelectedTab} selectedTab={selectedTab} />
              {getTabContent(selectedTab)}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__films-list">
            <FilmList films={similarFilms} />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default FilmPage;
