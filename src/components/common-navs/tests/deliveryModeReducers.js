import deliveryModeReducer from '../reducers/deliveryModeReducer';

const initialState = {
  mode: 'delivery'
};

describe('delivery mode reducer', () => {
  it(`sets the state key mode to the mode specified in
  action.mode if action.type is SET_DELIVERY_MODE`, () => {
    expect(
      deliveryModeReducer(initialState, {
        type: 'SET_DELIVERY_MODE',
        mode: 'pickup'
      })
    ).toEqual({
      mode: 'pickup'
    });
  });

  it('returns initial state if action.type is not handled', () => {
    expect(deliveryModeReducer(initialState, { type: 'UNHANDLED' })).toEqual(
      initialState
    );
  });
});
