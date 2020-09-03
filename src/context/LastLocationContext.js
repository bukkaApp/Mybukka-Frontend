import { useState, useEffect, } from 'react';
import constate from 'constate';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../shared/useLocalStorage';

const useLastLocation = () => {
  const [lastLocation, setLastLocation] = useLocalStorage('last-location', null);
  const [state, setState] = useState(null);
  const { listen } = useHistory();

  /**
   * <Redirect to={{ pathname: '/', state: { preventLastLocation: true }, }} />
   * <Link to={{ pathname: '/', state: { preventLastLocation: true } }} />
   */
  listen((loc) => {
    //  if (!loc.state || (loc.state && !loc.state.preventLastLocation))
    if (loc) setState(loc.pathname);
    if (!lastLocation) setLastLocation(loc.pathname);
  });

  useEffect(() => {
    console.log('loc------lastLocation-------------', lastLocation);
    return () => setLastLocation(state);
  }, [state]);

  return { setLastLocation, lastLocation };
};

export const [LastLocationProvider, useLastLocationContext] = constate(useLastLocation);
