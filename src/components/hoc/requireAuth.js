/* eslint-disable arrow-parens */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      // next=/profile
      const currentPage = this.props.location.pathname;
      if (!this.props.auth) {
        swal('You need to login first');
        this.props.history.push(`/login?name=${currentPage}`);
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ authenticationReducer: { status } }) {
    return { auth: status.authenticated };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
