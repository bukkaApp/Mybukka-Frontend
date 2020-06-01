import { useState } from 'react';
import constate from 'constate';

const useAddres = (initialState) => {
  const [state, setState] = useState(initialState);

  return [state, setState];
};

export const [AddressProvider, useAddresContext] = constate(useAddres);
