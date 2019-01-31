/* eslint-disable */
import React, { Component, Fragment } from 'react';
import PropTypes, { any } from 'prop-types';
import PrimaryNavbar from 'Components/navbar/PrimaryNavbar';
import Form from './components/authorisation';
import { validateRequest, validateSubmitButton } from './helper/validateRequestCredential';

/**
 * @description Login in component
 *
 * @class RegisterPage
 *
 * @namespace Component
 *
 * @extends Component
 */
class RegisterPage extends Component {
  /**
   * @description - Creates an instance of RegisterPage.
   *
   * @param {any} props - Component's props
   *
   * @memberof RegisterPage
   */
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: {
          value: '',
          type: 'text',
          placeholder: 'First Name',
          minLength: 3,
          errorMsg: {
            empty: 'This field is Required',
            invalid: 'This field can only be at least 3 letters',
          },
          touched: false,
          match: false,
          isSuccess: false
        },
        lastName: {
          value: '',
          type: 'text',
          placeholder: 'Last Name',
          minLength: 3,
          errorMsg: {
            empty: 'This field is Required',
            invalid: 'This field can only be at least 3 letters',
          },
          touched: false,
          match: false,
          isSuccess: false
        },
        email: {
          value: '',
          type: 'email',
          placeholder: 'Email address',
          errorMsg: {
            empty: 'This field is Required',
            invalid: 'Email must be valid',
          },
          touched: false,
          match: false,
          isSuccess: false
        },
        password: {
          value: '',
          type: 'password',
          placeholder: ' Password ',
          minLength: 8,
          errorMsg: {
            empty: 'This field is Required',
            invalid: 'This field should contain at least 8 alphabets and numbers',
          },
          touched: false,
          match: false,
          isSuccess: false,
        },
        confirmPassword: {
          value: '',
          type: 'password',
          placeholder: ' Re-type Password',
          minLength: 8,
          errorMsg: {
            empty: 'This field is Required',
            invalid: 'This field must be the same with password',
          },
          touched: false,
          match: false,
          isSuccess: false,
        },
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @function handleChange
   *
   * @param {*} event
   *
   * @returns {state} state
   */
  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    user[name].touched = true;
    user[name].value = value;
    // validate sign in
    validateRequest(user[name]);
    const submitted = validateSubmitButton(user);
    this.setState({ user, submitted });
  }

  /**
   * @function handleSubmit
   *
   * @param {*} event
   *
   * @returns {void} viod
   */
  handleSubmit(event) {
    event.preventDefault();

    this.props.history.push('/');
  }

  /**
     * @method render
     * @member RegisterPage
     * @param {*} Empty
     * @returns {object} object
     */
  render() {
    return (
      <Fragment>
          <PrimaryNavbar />
          <Form
          title='Sign Up'
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          inputData={this.state.user}
          isFormCompleted={this.state.submitted}
          />
      </Fragment>
    );
  }
}


export default RegisterPage;
