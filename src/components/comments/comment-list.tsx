import { Comment } from '../../types';
import CommentItemOfAList from './comment-item-of-a-list';

type Props = {
  reviews: Comment[];
}

function CommentsList({ reviews }: Props): JSX.Element {
  const reviewsColumnLeft = reviews.slice(0, Math.ceil(reviews.length / 2));
  const reviewsColumnRight = reviews.slice(Math.ceil(reviews.length / 2), reviews.length);

  function createReviewsColumn(columnReviews: Comment[]) {
    return (
      <div className="film-card__reviews-col">
        {columnReviews.map((review) => <CommentItemOfAList key={review.id} review={review}/>)}
      </div>
    );
  }

  return (
    <div className="film-card__reviews film-card__row">
      {createReviewsColumn(reviewsColumnLeft)}
      {createReviewsColumn(reviewsColumnRight)}
    </div>
  );
}

export default CommentsList;
