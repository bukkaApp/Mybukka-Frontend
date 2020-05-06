import { useEffect } from 'react';
import { useLocationContext } from '../context/LocationContext';

const useFreshQuery = () => {
  const { setCurrentLocation, coordinates } = useLocationContext();

  const mount = () => {
    setCurrentLocation();
    const unmount = () => console.log('unmounted'); // eslint-disable-line
    return unmount;
  };

  useEffect(mount, []);

  return coordinates;
};

export default useFreshQuery;
