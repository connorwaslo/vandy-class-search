import React from 'react';
import firebase from 'firebase/app';
import config from "./apis/firebase-config";
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
  blacklist: ['loggedIn', 'schedules', 'courses']  // Anything pulled from firebase is too complicated to cross-ref, so just don't persist it
};

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer);

export const persistor = persistStore(store);
persistor.purge();

console.log('Very initial store:');
console.log(store.getState());

class App extends React.Component {
  state = {
    showModal: false
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer store={store}/>
        </PersistGate>
      </Provider>
    )
  };
}

export default App;