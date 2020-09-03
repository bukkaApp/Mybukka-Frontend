import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const useFetchedRestaurant = (
  fetchBukka,
  fetchBukkaMenu,
  menuIsFetched,
  bukkaOfMenu
) => {
  const reactLocation = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
    const bukkaMenuToFetch = reactLocation.pathname.split('/')[2];
    if (!menuIsFetched || bukkaMenuToFetch !== bukkaOfMenu) {
      fetchBukkaMenu(bukkaMenuToFetch);
      fetchBukka(bukkaMenuToFetch);
    }
  }, []);
};

export default useFetchedRestaurant;
