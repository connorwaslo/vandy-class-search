import React from 'react';
import firebase from 'firebase/app';
import config from "./apis/firebase-config";
import storage from "redux-persist/es/storage";
import {PersistGate} from 'redux-persist/lib/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {persistReducer, persistStore} from "redux-persist";
import {login} from "./ducks/reducers";
import {createStore} from "redux";
import {Provider} from "react-redux";
import AppContainer from "./AppContainer";

firebase.initializeApp(config);

// Persist data
const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['loggedIn']
};

const pReducer = persistReducer(persistConfig, login);
const store = createStore(pReducer);
const persistor = persistStore(store);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <AppContainer/>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;