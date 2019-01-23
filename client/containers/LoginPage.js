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
 * @class LoginPage
 *
 * @namespace Component
 *
 * @extends Component
 */
class LoginPage extends Component {
  /**
   * @description - Creates an instance of LoginPage.
   *
   * @param {any} props - Component's props
   *
   * @memberof LoginPage
   */
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: {
          value: '',
          type: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Email address',
          },
          touched: false,
          match: false,
          isSuccess: false,
          errorMsg: {
            empty: 'This field is Required',
            invalid: 'Email must be valid',
          }
        },
        password: {
          value: '',
          type: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password (must be at least 8 characters)',
            minLength: 8
          },
          touched: false,
          match: false,
          isSuccess: false,
          errorMsg: {
            empty: 'This field is Required',
            invalid: 'Password must be at least 8 characters',
          }
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
      <Form heading="Log in" submit={this.handleSubmit}>
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
        <Button disabled={submitted}>LOG IN</Button>
        <Divider />
        <FacebookButton>Facebook</FacebookButton>
        <AltForm linkTo="/register" altText="SIGN UP">New to Bukka?</AltForm>
      </Form>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.objectOf(any).isRequired
};

export default LoginPage;
