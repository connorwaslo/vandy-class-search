import React from 'react';
import firebase from 'firebase/app';
import config from "./apis/firebase-config";
import {initProfileData} from "./data/loadInit";
import storage from "redux-persist/es/storage";
import {PersistGate} from 'redux-persist/lib/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {persistReducer, persistStore} from "redux-persist";
import {rootReducer} from "./ducks/reducers";
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

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer);
// Load data from firebase and use it to set the initial program state
initProfileData(store);

const persistor = persistStore(store);
persistor.purge();  // Note: when this is not commented out, email will not appear

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <AppContainer store={store}/>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;