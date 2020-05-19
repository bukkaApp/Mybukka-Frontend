import React from 'react';
import PropTypes from 'prop-types';
import Field from 'Components/input/Field';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import './InviteFriends.css';

const Content = ({ inputData, handleChange }) => (
  <section>
    <div className="coupon-header text-center text-dark">
      <h3>Get N1000 off all your purchases</h3>
    </div>
    <div className="content text-center">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
        praesentium nam fuga fugiat quos quasi consequatur voluptatum
        possimus inventore? Cumque.
      </p>
    </div>
    <div className="recipient-form">
      <form>
        <Field.Input
          type="text"
          name="emails"
          placeholderText="Enter email address(es) separated by commas"
          classNames="text-field form-control p-2"
          onFocus={() => {}}
          handleChange={handleChange}
          value={inputData.emails}
        />
        <button>
          <span>SEND</span>
        </button>
      </form>
    </div>
    <hr />
  </section>
);

export default Content;

Content.propTypes = {
  inputData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ])).isRequired,
  handleChange: PropTypes.func.isRequired,
};
