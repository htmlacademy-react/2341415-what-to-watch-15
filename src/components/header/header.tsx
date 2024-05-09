import { useNavigate } from 'react-router-dom';
import { PageRoute } from '../../const';
import Logo from '../logo/logo';

type Props = {
  className: string;
  children: React.ReactNode;
}

function Header({ className, children }: Props): JSX.Element {

  const navigate = useNavigate();

  function handleClick() {
    navigate(PageRoute.MyList);
  }

  return (
    <header className={`page-header ${className}`}>
      <Logo />
      {children}
      <ul className="user-block">
        <li className="user-block__item">
          <div onClick={handleClick} className="user-block__avatar">
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
