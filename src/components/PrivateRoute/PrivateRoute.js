import React from 'react';
import { Link } from 'react-router-dom';
import ViewWrappers from '../ViewWrappers/ViewWrappers';
import { useUserContext } from '../../context/UserContext';


const PrivateRoute = (props) => {
  const { isAuthenticated } = useUserContext();

  return isAuthenticated ? <props.component {...props} /> :
    (<ViewWrappers.View container withPadding>
      <div className="Intro">
        <h1>authenticationNeeded</h1>
        <p>
          You have to be signed in to access this page. If you have an account
          you can sign in <Link to="/login?next">here</Link>. Otherwise you can
          register as a store owner <Link to="/stores/new/">here</Link>.
        </p>
      </div>
    </ViewWrappers.View>);
};

export default PrivateRoute;
