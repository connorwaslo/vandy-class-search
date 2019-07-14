import React from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import {Container} from "@material-ui/core";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import ProfileQuestions from "./screens/ProfileQuestions";
import Dashboard from "./screens/Dashboard";
import Loading from "./screens/Loading";
import PrivateRoute from "./components/PrivateRoute";

class AppContainer extends React.Component {
  render() {
    console.log('Loading?', this.props.loading);
    if (this.props.loading) {
      return <Loading finish={this.props.finish}/>
    }

    console.log(this.props.store.getState());
    return (
      <Router basename='/course-search/'>
        <Container>
          <Route exact path='/' component={Signup}/>
          <Route path='/login' component={Login}/>
          <PrivateRoute path='/profile-setup' component={ProfileQuestions}/>
        </Container>

        {/*<Route exact path='/' component={Signup} />*/}
        <PrivateRoute path='/dashboard' component={Dashboard}/>
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

AppContainer = connect(mapStateToProps, null)(AppContainer);

export default AppContainer;
