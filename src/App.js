import React from 'react';
import {createStore} from 'redux';
import login from './ducks/reducers';
import {BrowserRouter as Router, Route} from "react-router-dom";
import config from './apis/firebase-config';
import firebase from 'firebase/app';
import './App.css';
import {Container} from "@material-ui/core";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import ProfileQuestions from "./screens/ProfileQuestions";
import Dashboard from "./screens/Dashboard";
import {Provider} from "react-redux";

firebase.initializeApp(config);

const store = createStore(login);

function App() {
  return (
    <Provider store={store}>
      <Router basename='/course-search/'>
        <Container>
          <Route exact path='/' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/profile-setup' component={ProfileQuestions} />
        </Container>

        <Route exact path='/' component={Signup} />
        <Route path='/dashboard' component={Dashboard} />
      </Router>
    </Provider>
  );
}

export default App;
