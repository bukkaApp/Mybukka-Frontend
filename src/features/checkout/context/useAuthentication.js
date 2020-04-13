import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';


const useAuthentication = (authServices, signOut, swal) => {
  const history = useHistory();
  const reactLocation = useLocation();

  useEffect(() => {
    const currentPage = reactLocation.pathname;
    if (!authServices.getToken() || !authServices.isValid(authServices.getToken())) {
      signOut();
      setTimeout(() => {
        swal('You need to login first')
          .then((willDelete) => {
            if (willDelete) {
              return history.push(`/login?next=${currentPage}`);
            }
          });
      }, 2000);
    }
  });
};

export default useAuthentication;
