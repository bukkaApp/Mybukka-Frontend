/* eslint-disable no-mixed-operators */
import { useEffect, useState, useMemo } from 'react';


const useLocationWithinDistance = (coordinates, restaurantCoordinates) => {
  const [isWithinDeliveryRange, setDeliveryRange] = useState(false);

  const radius = x => x * Math.PI / 180;

  const getDistance = (userCoordinates, bukkaCoordinates) => {
    const earthRadius = 6378137; // Earth’s mean radius in meter
    // [1] - lattitude || [2] - longitude
    const differenceInLat = radius(bukkaCoordinates[1] - userCoordinates[1]);
    const differenceInLng = radius(bukkaCoordinates[0] - userCoordinates[0]);
    const TrigonometryDistance = Math.sin(differenceInLat / 2) * Math.sin(differenceInLat / 2) +
      Math.cos(radius(userCoordinates[1])) * Math.cos(radius(bukkaCoordinates[1])) *
      Math.sin(differenceInLng / 2) * Math.sin(differenceInLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(TrigonometryDistance), Math.sqrt(1 - TrigonometryDistance));
    const distance = earthRadius * c;
    return distance; // returns the distance in meter
  };

  const validateUserLocationRange = () => {
    // user coordinate
    const distanceInMeter = getDistance(coordinates, restaurantCoordinates);
    const distanceInKilometer = distanceInMeter / 1000;
    if (distanceInKilometer > 5) {
      setDeliveryRange(false);
    } else { setDeliveryRange(true); }
  };

  useEffect(() => {
    if (restaurantCoordinates.length) {
      validateUserLocationRange();
    }
  }, [coordinates, restaurantCoordinates]);

  return useMemo(() => [isWithinDeliveryRange, validateUserLocationRange],
    [coordinates, restaurantCoordinates]);
};

export default useLocationWithinDistance;
