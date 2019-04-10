import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import Carousel from '../Carousel';

describe('Carousel component', () => {
  const props = {
    textOverlay: false,
    classNames: 'some-classnames',
    noOfImagesShown: 3,
    title: 'A carousel',
    slideItems: [
      {
        deliveryTime: '30-50 min',
        author: 'Bane',
        deliveryCost: 300,
        imageUrl:
          'https://res.cloudinary.com/deqt3envc/image/upload/v1549300439/banner-img-3.jpg',
        rating: 'popular',
        position: { top: true },
        heading: 'it\'s heading',
        subHeading: 'sub heading here',
      },
      {
        deliveryTime: '1 hour',
        author: "Ra's Al Ghul",
        deliveryCost: 400,
        imageUrl:
          'https://res.cloudinary.com/deqt3envc/image/upload/v1549300440/banner-img-2.jpg',
        position: { bottom: true },
        heading: 'it\'s heading',
        subHeading: 'sub heading here',
      }
    ],
    imageHeight: 'img-height',
    controlClassNames: 'control-class'
  };

  const wrapper = render(
    <MemoryRouter>
      <Carousel {...props} />
    </MemoryRouter>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
