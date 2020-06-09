import { useHistory as History } from 'react-router-dom';
import {
  unstable_scheduleCallback as defer,
  unstable_ImmediatePriority as ImmediatePriority
} from 'scheduler';
import { useLoadingContext } from '../context/LoadingContext';

const useHistory = () => {
  const { push: next, ...props } = History();
  const { loading } = useLoadingContext();

  const push = (url, ...data) => {
    loading(true);
    return defer(ImmediatePriority, () => {
      loading(false);
      next(url, ...data);
    });
  };

  return { push, ...props };
};

export default useHistory;
