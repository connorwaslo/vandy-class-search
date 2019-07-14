import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route} from 'react-router-dom';

let PrivateRoute = ({component: Component, loggedIn, ...rest}) => (
  <Route
    {...rest}
    render={props => loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: {from: props.location}
        }}/>
    )}/>
);

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

export default connect(mapStateToProps, null)(PrivateRoute);
