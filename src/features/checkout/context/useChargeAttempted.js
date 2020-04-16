import { useEffect } from 'react';


const useChargeAttempted = (message, url) => {
  useEffect(() => {
    if (message === 'Charge attempted' && !url) $('#inputSecurityKey').modal('show');
    return () => $('#inputSecurityKey').modal('hide');
  });
};

export default useChargeAttempted;
