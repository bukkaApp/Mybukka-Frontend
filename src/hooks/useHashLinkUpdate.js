import { useEffect } from 'react';

const useHashLinkUpdate = () => {
  useEffect(() => {
    const selected = location.hash;
    if (selected && selected.length > 0) {
      const elem = document.querySelector(selected);
      elem && elem.scrollIntoView(); // eslint-disable-line
    }
  }, [location]);
};

export default useHashLinkUpdate;

