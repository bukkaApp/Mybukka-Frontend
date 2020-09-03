import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 * @param {*} effect
 * @param {*} ref
 * @returns {void}
 */
const useClickOutside = (effect, ref) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     * @param {*} event
     * @returns {void}
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        effect();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useClickOutside;
