import ReviewForm from '../../components/forms/review-form';
import Header from '../../components/genre-tabs/header/header';
import { useAppSelector } from '../../hooks/app-dispatch';
import { selectSelectedFilm } from '../../store/film-slice';

function AddReviewPage(): JSX.Element {
  const selectedFilm = useAppSelector(selectSelectedFilm);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src={selectedFilm.backgroundImage}
            alt={selectedFilm.name}
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header className='page-header'>{
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">
                  {selectedFilm.name}
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        }
        </Header>
        <div className="film-card__poster film-card__poster--small">
          <img
            src={selectedFilm.posterImage}
            alt={selectedFilm.name}
            width={218}
            height={327}
          />
        </div>
      </div>
      <div className="add-review">
        <ReviewForm />
      </div>
    </section>
  );
}

export default AddReviewPage;
