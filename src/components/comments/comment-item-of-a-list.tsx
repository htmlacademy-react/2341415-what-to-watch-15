import { Comment } from '../../types';
import { format } from 'date-fns';

type Props = {
  review: Comment;
};

function CommentItemOfAList({ review }: Props): JSX.Element {
  const { comment, date, rating, user } = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">
          {comment}
        </p>
        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time className="review__date" dateTime="2016-12-24">
            {format(date, 'MMMM dd, yyyy')}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>

  );
}

export default CommentItemOfAList;
