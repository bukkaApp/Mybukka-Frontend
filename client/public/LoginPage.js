import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bukkaLogo from '../images/bukka_logo.png';

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
        email: '',
        password: ''
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
      <main className="form-Wrapper">
        <div className="form-container mx-auto col-lg-4 col-md-6 col-sm-6">
          <h2>Log in</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="form-group form-padding">
              <input
                type="text"
                className="form-control form-input"
                name="email"
                placeholder="Email address"
                value={user.email}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
              />
            </div>
            <div className="form-group form-padding">
              <input
                type="text"
                className="form-control form-input"
                name="password"
                placeholder="Password (must be atleast 8 character)"
                value={user.password}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
              />
            </div>
            <div className="form-group mt-4 mb-2 form-padding">
              <button type="submit" className="btn btn-primary btn-action col-md-12" disabled={!submitted}>LOG IN</button>
            </div>
            <div className="form-padding">
              <div className="form-divider">
                <span>or</span>
              </div>
            </div>
            <div className="clear" />
            <div className="form-group mt-2 mb-2 form-padding">
              <button className="btn fb-btn btn-action col-md-12">Facebook
                <i className="fab fa-facebook fa-2x fb-r" />
              </button>
            </div>
            <div className="alt">
              <p>New to Bukka?</p>
              <Link to="/register" className="btn btn-link">SIGN UP</Link>
            </div>
          </form>
        </div>
        <img className="logo" src={bukkaLogo} alt="bukka-png" />
      </main>
    );
  }
}

export default LoginPage;
