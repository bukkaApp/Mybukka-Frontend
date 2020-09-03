import React from 'react';
import BannerSection from '../common/BannerSection';
import SupportMainSection from './SupportMainSection';
import { useUserContext } from '../../../context/UserContext';

const SupportBuyer = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <div>
      <BannerSection />
      <SupportMainSection authenticated={isAuthenticated} />
    </div>
  );
};


export default SupportBuyer;

