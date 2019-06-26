import React from 'react';
import {createStore} from 'redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
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

// Persist data
const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, login);
const store = createStore(pReducer);
const persistor = persistStore(store);

class App extends React.Component {
  componentDidMount() {
    // Check to see if user is still signed in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User still signed in', user.email);
      } else {
        console.log('Logged out');
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <Router basename='/course-search/'>
            <Container>
              <Route exact path='/' component={Signup}/>
              <Route path='/login' component={Login}/>
              <Route path='/profile-setup' component={ProfileQuestions}/>
            </Container>

            {/*<Route exact path='/' component={Signup} />*/}
            <Route path='/dashboard' component={Dashboard}/>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
