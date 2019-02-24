import React from 'react';

import NearbyBukka from '../components/NearByBukka';

describe('IntroSection FeedPage component', () => {
  const props = {
    bukkaData: [
      {
        deliveryTime: '30-50 min',
        author: 'Bane',
        deliveryCost: 300,
        image:
          'https://res.cloudinary.com/deqt3envc/image/upload/v1549300439/banner-img-3.jpg',
        rating: 'popular'
      }
    ]
  };

  const wrapper = shallow(<NearbyBukka {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
