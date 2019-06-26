import {LOGIN_EMAIL} from "./actionTypes";

const initialState = {
  email: ''
};

// For now just return the state
let login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_EMAIL:
      return Object.assign({}, state, {
        email: action.email
      });
    default:
      return state;
  }
};

export default login;