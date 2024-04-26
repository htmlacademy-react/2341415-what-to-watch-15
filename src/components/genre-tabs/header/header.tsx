import { Link } from 'react-router-dom';
import { PageRoute } from '../../../const';

type Props = {
  className: string;
  children: React.ReactNode;
}

function Header({ className, children }: Props): JSX.Element {
  return (
    <header className={`page-header ${className}`}>
      <div className="logo">
        <Link to={PageRoute.Main} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {children}
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
          </div>
        </li>
        <li className="user-block__item">
          <a className="user-block__link">Sign out</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
