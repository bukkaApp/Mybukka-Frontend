import setDeliveryMode from '../actionCreators/setDeliveryMode';

describe('set Delivery Mode action creator', () => {
  it(`creates action with type SET DELIVERY MODE
  as well as mode in payload`, async () => {
    const store = mockStore({});

    const expectedActions = [{
      type: 'SET_DELIVERY_MODE',
      mode: 'delivery',
    }];

    await store.dispatch(setDeliveryMode('delivery'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
