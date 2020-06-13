import { useState, useEffect } from 'react';
import constate from 'constate';
import { useLocalStorage } from '../shared/useLocalStorage';

const useImages = () => {
  const [data, setData] = useLocalStorage('images', {});
  const [state, dispatch] = useState(data);

  useEffect(() => {
    setData(state);
  }, [state]);

  const setImages = (imgName) => {
    const imgs = { ...state };
    imgs[imgName] = true;
    dispatch(imgs);
  };

  return [state, setImages];
};

export const [ImagesProvider, useImagesContext] = constate(useImages);
