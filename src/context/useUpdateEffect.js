import { useRef, useEffect } from 'react';
import useIsMounted from './useIsMounted';

const useUpdateEffect = (effect, dependencies = []) => {
  const isMounted = useIsMounted();
  const isInitialMount = useRef(true);

  useEffect(() => {
    let effectCleanupFunc = function noop() {};
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effectCleanupFunc = effect() || effectCleanupFunc;
    }
    return () => {
      effectCleanupFunc();
      if (!isMounted.current) {
        isInitialMount.current = true;
      }
    };
  }, dependencies);
};

export default useUpdateEffect;

