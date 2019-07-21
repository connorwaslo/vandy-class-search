import React from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import './App.css';
import {Container} from "@material-ui/core";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import ProfileQuestions from "./screens/ProfileQuestions";
import Dashboard from "./screens/Dashboard";
import Loading from "./screens/Loading";
import PrivateRoute from "./components/PrivateRoute";
import Schedule from "./screens/Schedule";

class AppContainer extends React.Component {
  render() {
    if (this.props.loading) {
      return <Loading finish={this.props.finish}/>
    }

    console.log('Taken Courses:', this.props.takenCourses);
    return (
      <Router basename='/course-search/'>
        <Container>
          <Route exact path='/' component={Signup}/>
          <Route path='/login' component={Login}/>
          <Route path='/schedule' component={Schedule}/>
          <PrivateRoute path='/profile-setup' component={ProfileQuestions}/>
        </Container>

        <PrivateRoute path='/dashboard' component={Dashboard}/>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    loggedIn: state.auth.loggedIn,
    searches: state.searches,
    takenCourses: state.courses.takenCourses
  }
};

AppContainer = connect(mapStateToProps, null)(AppContainer);

export default AppContainer;
