import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import BukkaImageSection from '../components/BukkaImageSection';

const initialState = {
  fetchBukkaReducer: {
    fetchedBukka: { imageUrl: 'www.imaeUrl.com' }
  }
};

const store = mockStore(initialState);

describe('BukkaImageSection Component', () => {
  const props = {
    imageUrl: 'http://some-img-url',
  };

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <BukkaImageSection {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
