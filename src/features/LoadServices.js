/* eslint-disable no-unused-expressions */

import React, { memo, useMemo } from 'react';
import Script from 'react-load-script';
import { useMapContext } from '../context/MapContext';

const LoadService = memo(() => {
  const mounted = React.useRef(false);
  const scriptReady = React.useRef(false);
  const { onLoad, hasMap } = useMapContext();

  const handleScriptLoad = () => {
    onLoad(true); // load map
  };

  useMemo(() => {
    mounted.current = true;
    if (scriptReady.current) {
      handleScriptLoad();
    } else if (window.google) {
      handleScriptLoad();
    }
  }, [mounted, scriptReady, window.google]);

  return (
    <Script
      url={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.GOOGLE_API_KEY}${hasMap ? '&callback=initMap' : ''}`}
      onLoad={() => { mounted.current ? handleScriptLoad() : scriptReady.current = true; }}
    />
  );
});

export default LoadService;
