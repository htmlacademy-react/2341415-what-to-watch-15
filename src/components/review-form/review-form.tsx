import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addCommentAction, selectIsCommentAddingInProgress } from '../../store/comments-slice';
import { useNavigate } from 'react-router-dom';
import { AppRoute, FilmTab } from '../../const';
import './review-form.css';

type Props = {
  id: string;
}

function ReviewForm({ id }: Props): JSX.Element {

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCommentAddingInProgress = useAppSelector(selectIsCommentAddingInProgress);

  function clearCommentForm() {
    setReview('');
    setRating(0);
  }

  function handleRatingChange(evt: FormEvent<HTMLInputElement>) {
    const newRating = parseInt((evt.target as HTMLInputElement).value, 10);
    setRating(newRating);
  }

  function handleReviewChange(evt: FormEvent<HTMLTextAreaElement>) {
    evt.preventDefault();
    setReview(evt.currentTarget.value);
  }

  function handleFormSubmit(evt: FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    dispatch(addCommentAction({
      comment: { comment: review , rating, id },
      onSuccess: () => {
        clearCommentForm();
        navigate(`${AppRoute.Films}${id}?tab=${FilmTab.Comments}`);
      }
    }));
  }

  function isFormInputsValueValid() {
    return review.length > 50 && review.length < 400 && rating;
  }

  return (
    <form action="#" className="add-review__form">
      <div className={isCommentAddingInProgress ? 'disabled' : ''}>
        <div className="rating">
          <div className="rating__stars">
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-10"
              type="radio"
              name="rating"
              defaultValue={10}
              checked={rating === 10}
            />
            <label className="rating__label" htmlFor="star-10">
              Rating 10
            </label>
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-9"
              type="radio"
              name="rating"
              defaultValue={9}
              checked={rating === 9}
            />
            <label className="rating__label" htmlFor="star-9">
              Rating 9
            </label>
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-8"
              type="radio"
              name="rating"
              defaultValue={8}
              defaultChecked={undefined}
              checked={rating === 8}
            />
            <label className="rating__label" htmlFor="star-8">
              Rating 8
            </label>
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-7"
              type="radio"
              name="rating"
              defaultValue={7}
              checked={rating === 7}
            />
            <label className="rating__label" htmlFor="star-7">
              Rating 7
            </label>
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-6"
              type="radio"
              name="rating"
              defaultValue={6}
              checked={rating === 6}
            />
            <label className="rating__label" htmlFor="star-6">
              Rating 6
            </label>
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-5"
              type="radio"
              name="rating"
              defaultValue={5}
              checked={rating === 5}
            />
            <label className="rating__label" htmlFor="star-5">
              Rating 5
            </label>
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-4"
              type="radio"
              name="rating"
              defaultValue={4}
              checked={rating === 4}
            />
            <label className="rating__label" htmlFor="star-4">
              Rating 4
            </label>
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-3"
              type="radio"
              name="rating"
              defaultValue={3}
              checked={rating === 3}
            />
            <label className="rating__label" htmlFor="star-3">
              Rating 3
            </label>
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-2"
              type="radio"
              name="rating"
              defaultValue={2}
              checked={rating === 2}
            />
            <label className="rating__label" htmlFor="star-2">
              Rating 2
            </label>
            <input
              onChange={handleRatingChange}
              className="rating__input"
              id="star-1"
              type="radio"
              name="rating"
              defaultValue={1}
              checked={rating === 1}
            />
            <label className="rating__label" htmlFor="star-1">
              Rating 1
            </label>
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            onChange={handleReviewChange}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={review}
          />
          <div className="add-review__submit">
            <button onClick={handleFormSubmit} className="add-review__btn" type="submit" disabled={!isFormInputsValueValid() || isCommentAddingInProgress}>
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
