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
  blacklist: ['loggedIn']
};

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer);

const persistor = persistStore(store);
// persistor.purge();  // Note: when this is not commented out, email will not appear

class App extends React.Component {
  state = {
    loading: true
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer loading={this.state.loading}
                        finish={this._finishLoading}
                        store={store}/>
        </PersistGate>
      </Provider>
    )
  };

  _finishLoading = () => {
    this.setState({ loading: false });
  };
}

export default App;