import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useHashLinkUpdate = () => {
  // console.log('useHashLinkUpdate');
  const { location } = useHistory();

  useEffect(() => {
    const selected = location.hash;
    if (selected && selected.length > 0) {
      const elem = document.querySelector(selected);
      elem && elem.scrollIntoView(); // eslint-disable-line
    }
  }, [location]);
};

export default useHashLinkUpdate;
