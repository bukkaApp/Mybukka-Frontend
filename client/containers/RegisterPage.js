import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import Input from '../components/Form/Input/Input';
import Form from '../components/Form/Form';
import Button from '../components/Form/Button/Button';
import FacebookButton from '../components/Form/Button/SocialBtn';
import Divider from '../components/Form/Divider/Divider';
import AltForm from '../components/Form/AltForm/AltForm';
import { validateRequest, validateSubmitButton } from '../_helpers/validateRequestCredential';

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
          elementConfig: {
            type: 'text',
            placeholder: 'First Name',
            minLength: 3
          },
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
          elementConfig: {
            type: 'text',
            placeholder: 'Last Name',
            minLength: 3
          },
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
          elementConfig: {
            type: 'text',
            placeholder: 'Email address'
          },
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
          type: 'input',
          elementConfig: {
            type: 'password',
            placeholder: ' Password ',
            minLength: 8
          },
          errorMsg: {
            empty: 'This field is Required',
            invalid: 'Password must be at least 8 characters',
          },
          touched: false,
          match: false,
          isSuccess: false,
        },
        confirmPassword: {
          value: '',
          type: 'input',
          elementConfig: {
            type: 'password',
            placeholder: ' Re-type Password ',
            minLength: 8
          },
          errorMsg: {
            empty: 'This field is Required',
            invalid: 'This must be the same with password',
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
    const { user, submitted } = this.state;
    return (
      <Form heading="Sign Up" submit={this.handleSubmit}>
        {
          Object.keys(user).map(el => (
            <Input
              name={el}
              key={el}
              attributeConfig={user[el].elementConfig}
              valued={user[el].value}
              changed={this.handleChange}
              touched={user[el].touched}
              matched={user[el].match}
              errorMsg={user[el].touched && !user[el].value ?
                user[el].errorMsg.empty : user[el].errorMsg.invalid}
            />
          ))
        }
        <Button disabled={submitted}>Sign Up</Button>
        <Divider />
        <FacebookButton>Facebook</FacebookButton>
        <AltForm linkTo="/login" altText="LOG IN">Already a user?</AltForm>
      </Form>
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.objectOf(any).isRequired
};

export default RegisterPage;
