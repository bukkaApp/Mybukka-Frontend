import React, { Component } from 'react';
import Input from '../components/Form/Input/Input';
import Form from '../components/Form/Form';
import Button from '../components/Form/Button/Button';
import FacebookButton from '../components/Form/Button/SocialBtn';
import Divider from '../components/Form/Divider/Divider';
import AltForm from '../components/Form/AltForm/AltForm';

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
          touched: false,
          match: false,
          isSuccess: false,
        },
        lastName: {
          value: '',
          type: 'text',
          elementConfig: {
            type: 'text',
            placeholder: 'Last Name',
            minLength: 3
          },
          touched: false,
          match: false,
          isSuccess: false,
        },
        email: {
          value: '',
          type: 'email',
          elementConfig: {
            type: 'text',
            placeholder: 'Email address',
            minLength: 3
          },
          touched: false,
          match: false,
          isSuccess: false,
        },
        password: {
          value: '',
          type: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password (must be atleast 8 character)',
            minLength: 3
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
            placeholder: 'Confirm Password',
            minLength: 3
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
    this.handleFocus = this.handleFocus.bind(this);
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
    if (user.email && user.password.length >= 8) {
      this.setState({
        submitted: true
      });
    } else {
      this.setState({
        submitted: false
      });
    }
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  /**
   * @function handleFocus
   *
   * @param {*} Empty
   *
   * @returns {state} state
   */
  handleFocus() {
    const { user } = this.state;
    if (user.email && user.password.length >= 8) {
      this.setState({
        submitted: true
      });
    }
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

    // eslint-disable-next-line no-unused-vars
    const { user } = this.state;
    // const validation = validateSignUp(user);
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
              value={user[el].value}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
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

export default RegisterPage;
