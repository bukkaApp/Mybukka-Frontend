/* eslint-disable arrow-parens */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import authServices from '../../utils/authServices';
import logOut from '../navbar/actionCreators/logOut';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const currentPage = this.props.location.pathname;
      if (!authServices.isValid(authServices.getToken())) {
        this.props.signOut();
      }
      if (!this.props.auth) {
        swal('You need to login first');
        this.props.history.push(`/login?next=${currentPage}`);
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ authenticationReducer: { status } }) {
    return { auth: status.authenticated };
  }

  return connect(mapStateToProps, { signOut: logOut })(ComposedComponent);
};
