import React from 'react';
import { useHistory } from 'react-router-dom';
// Load dismiss modal component
import DismissModal from '../modal/DismissModal';


import './Toast.scss';
import { useToastContext } from '../../context/ToastContext';

const Toast = () => {
  const { toast, setToast } = useToastContext();
  const history = useHistory();

  history.listen(() => {
    if (toast.message) { setToast({ message: null }); }
  });

  return !toast.message ? null : (
    <div className={`Toast Toast--${toast.type}`}>
      <div className="toast-padding">
        {toast.message}
      </div>
      <div>
        <DismissModal className="padding-none" onClick={() => { setToast({ message: null }); }} />
      </div>
    </div>
  );
};

export default Toast;
