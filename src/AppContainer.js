import React from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import firebase from 'firebase/app';
import './App.css';
import {Container} from "@material-ui/core";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import ProfileQuestions from "./screens/ProfileQuestions";
import Dashboard from "./screens/Dashboard";
import {changeAuthStatus} from "./ducks/actions";

class AppContainer extends React.Component {
  componentDidMount() {
    const {loggedIn} = this.props;
    // Check to see if user is still signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Only update store if it conflicts with reality
        if (!loggedIn) {
          this.props.authStatus(true);
        }
        console.log('User still signed in', user.email);
      } else {
        this.props.authStatus(false);
        console.log('Logged out');
      }
    });
  }

  render() {
    return (
      <Router basename='/course-search/'>
        <Container>
          <Route exact path='/' component={Signup}/>
          <Route path='/login' component={Login}/>
          <Route path='/profile-setup' component={ProfileQuestions}/>
        </Container>

        {/*<Route exact path='/' component={Signup} />*/}
        <Route path='/dashboard' component={Dashboard}/>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.email,
    loggedIn: state.loggedIn,
    searches: state.searches
  }
};

const mapDispatchToProps = dispatch => {
  return {
    authStatus: (loggedIn) => {
      // Dispatch the following action...
      dispatch(changeAuthStatus(loggedIn));
    }
  }
};

AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer);

export default AppContainer;
