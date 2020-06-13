import { useState } from 'react';
import constate from 'constate';

const useSearch = () => {
  const [state, setState] = useState('');

  return [state, setState];
};

export const [SearchProvider, useSearchContext] = constate(useSearch);
