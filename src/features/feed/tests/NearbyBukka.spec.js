import React from 'react';

import NearbyBukka from '../common/NearByBukka';

describe('IntroSection FeedPage component', () => {
  const props = {
    classNames: 'class-component',
    imageHeight: 'img-height',
    bukkaData: [
      {
        deliveryTime: '30-50 min',
        author: 'Bane',
        deliveryCost: 300,
        image:
          'https://res.cloudinary.com/deqt3envc/image/upload/v1549300439/banner-img-3.jpg',
        rating: 'popular',
        imageHeight: 'img-height'
      }
    ]
  };

  const wrapper = shallow(<NearbyBukka {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
