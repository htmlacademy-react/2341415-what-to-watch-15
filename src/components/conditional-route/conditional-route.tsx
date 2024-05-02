import { Navigate } from 'react-router-dom';
import { PageRoute } from '../../const';

type Props = {
  condition: boolean;
  routOnFalse: PageRoute;
  children: JSX.Element;
};

function ConditionalRoute(props: Props): JSX.Element {
  const { condition, children, routOnFalse } = props;

  function getLocation() {
    if (condition) {
      return children;
    }

    return <Navigate to={routOnFalse} replace />;
  }

  return getLocation();
}

export default ConditionalRoute;
