import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../services/reducers';

function ProtectedRoute({ component: Component, pathToRedirect, ...rest }) {
  const { isLoggedIn } = useSelector((state: RootState) => state.app);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => (isLoggedIn ? <Component /> : <Redirect to={pathToRedirect} />)}
    />
  );
}

export default React.memo(ProtectedRoute);
