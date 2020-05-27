import React from 'react';
import Modal from '../modal/Modal';
import './index.scss';



const FeedbackModal = () => {
  const wrapperRef = React.createRef();
  
    return (
      <Modal ref={wrapperRef} show={true}>
        <div class="text-align mt-5">
          <i class="fas fa-2x fa-chevron-left custom-icon"></i>
        </div>

        <div className="feedback-content">
          <h6 className="heading">Order Sent, Awaiting Approval</h6>
          <p className="feedback-note">
            We help businesses like yours reach new customers in your
            neighborhoods and grow to become local favorites.
          </p>
        </div>

        <div className="text-align mt-3 mb-5">
          <span className="view-item">View Item</span>
          <span className="cancel-order">Cancel Order</span>
        </div>
      </Modal>
    );
};

export default FeedbackModal;