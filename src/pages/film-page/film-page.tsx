import { useState } from 'react';
import FilmTabs from '../../components/film-tabs/film-tabs';
import Footer from '../../components/footer/footer';
import Header from '../../components/genre-tabs/header/header';
import { Film } from '../../types';
import { FilmTab, PageRoute } from '../../const';
import FilmOverview from '../../components/film-tabs/film-overview';
import FilmDetails from '../../components/film-tabs/film-details';
import FilmCardButtons from '../../components/film-card-buttons/film-card-buttons';
import CommentsList from '../../components/comments/comment-list';
import { useAppSelector } from '../../hooks/app-dispatch';
import { selectComments } from '../../store/comments-slice';
import { Link } from 'react-router-dom';

type Props = {
  selectedFilm: Film;
};

function FilmPage({ selectedFilm }: Props): JSX.Element {
  const { name, genre, released, posterImage, backgroundImage, id } = selectedFilm;
  const [selectedTab, setSelectedTab] = useState<FilmTab>(FilmTab.OverView);
  const reviews = useAppSelector(selectComments);

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
                <FilmCardButtons id={id} videoLink={selectedFilm.videoLink} />
                <Link to={PageRoute.FilmReview} className="btn film-card__button">
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
            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img
                  src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
                  alt="Fantastic Beasts: The Crimes of Grindelwald"
                  width={280}
                  height={175}
                />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">
                  Fantastic Beasts: The Crimes of Grindelwald
                </a>
              </h3>
            </article>
            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img
                  src="img/bohemian-rhapsody.jpg"
                  alt="Bohemian Rhapsody"
                  width={280}
                  height={175}
                />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">
                  Bohemian Rhapsody
                </a>
              </h3>
            </article>
            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/macbeth.jpg" alt="Macbeth" width={280} height={175} />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">
                  Macbeth
                </a>
              </h3>
            </article>
            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/aviator.jpg" alt="Aviator" width={280} height={175} />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">
                  Aviator
                </a>
              </h3>
            </article>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default FilmPage;
