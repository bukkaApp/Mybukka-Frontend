import { useEffect, useRef } from 'react';

const useIsMounted = function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return function cleanupSetIsMounted() {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default useIsMounted;
