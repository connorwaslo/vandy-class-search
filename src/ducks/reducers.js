import {
  LOGIN_EMAIL,
  CHANGE_AUTH_STATUS, LOG_OUT
} from "./actionTypes";

const initialState = {
  email: '',
  loggedIn: false // Is user logged in?
};

// Auth action reducers
let login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_EMAIL:
      return {
        ...state,
        email: action.email,
        loggedIn: true
      };
    case CHANGE_AUTH_STATUS:
      return {
        ...state,
        loggedIn: action.loginStatus
      };
    case LOG_OUT:  // Just wipe all the auth state
      return {
        ...state,
        email: '',
        loggedIn: false
      };
    default:
      return state;
  }
};

export default login;