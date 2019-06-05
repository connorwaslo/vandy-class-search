import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import config from './apis/firebase-config';
import firebase from 'firebase/app';
import './App.css';
import {Container} from "@material-ui/core";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import ProfileQuestions from "./screens/ProfileQuestions";
import Dashboard from "./screens/Dashboard";

firebase.initializeApp(config);

function App() {
  return (
    <Router>
      {/*<Container>
        <Route exact path='/' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/profile-setup' component={ProfileQuestions} />
      </Container>*/}

      <Route exact path='/' component={Signup} />
      <Route path='/dashboard' component={Dashboard} />
    </Router>
  );
}

export default App;
