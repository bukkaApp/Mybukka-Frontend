/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';

const initializeData = {
  domain: '',
  supports: {
    webp: false
  }
};

const CloudinaryContext = React.createContext(initializeData);
const useCloudinayService = () => React.useContext(CloudinaryContext);

const CloudinaryProvider = (props) => {
  const [state, setState] = useState({
    isLoaded: false,
    supports: {
      webp: false
    }
  });

  /**
   * @memberof CloudinaryProvider
   * @returns {void}
   */
  const supportsWebp = () => {
    if (!window.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    return fetch(webpData)
      .then(r => r.blob())
      .then(blob => createImageBitmap(blob).then(() => {
        setState({ supports: { ...state.supports, webp: true }, isLoaded: true });
      }, () => setState({ supports: { ...state.supports, webp: true }, isLoaded: true })));
  };

  /**
   * @memberof CloudinaryProvider
   * @method componentDidMount
   * @returns {void}
   */
  useEffect(() => {
    console.log('cloudinary compoenent leaking');
    supportsWebp();
  }, []);

  const { /* isLoaded, */ supports } = state;
  const { domain = 'https://res.cloudinary.com', accountId, children } = props;

  // if (!isLoaded) return null

  return (
    <CloudinaryContext.Provider
      value={{ domain, accountId, supports }}
    >
      { children }
    </CloudinaryContext.Provider>
  );
};


export { CloudinaryProvider, useCloudinayService };
