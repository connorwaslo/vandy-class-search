import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import config from './apis/firebase-config';
import firebase from 'firebase/app';
import './App.css';
import {Container} from "@material-ui/core";
import Signup from "./screens/Signup";
import Login from "./screens/Login";

firebase.initializeApp(config);

function App() {
  return (
    <Router>
      <Container>
        <div>
          <ul>
            <Link to='/'>Home</Link>
          </ul>
          <ul>
            <Link to='/Login'>Login</Link>
          </ul>
        </div>

        <Route exact path='/' component={Signup} />
        <Route path='/login' component={Login} />
      </Container>
    </Router>
  );
}

export default App;
