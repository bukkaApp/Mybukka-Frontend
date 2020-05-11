import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import BukkaDetailsSection from '../components/BukkaDetailsSection';

const initialState = {
  navbarAuthReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
  checkoutModeReducer: { mode: true },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  authenticationReducer: {
    status: {
      authenticated: false,
      error: false
    }
  },
  businessReducer: {
    fetchedBukka: {
      title: 'title',
      imageUrl: 'www.imageUrl.com',
      description: 'your description',
      price: 4454,
      category: 'african',
      slug: 'any-way-slug'
    },
  }
};

const store = mockStore(initialState);

describe('BukkaDetailsSection Component', () => {
  const props = {
    bukkaName: 'Cheepottles',
    description: 'lovely cheepotles'
  };

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <BukkaDetailsSection {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
