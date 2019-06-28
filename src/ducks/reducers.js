import {
  LOGIN_EMAIL, CHANGE_AUTH_STATUS, LOG_OUT,
  CHANGE_SEARCH_TYPE, CHANGE_SEARCH_TEXT
} from "./actionTypes";
import {combineReducers} from "redux";

const initialAuthState = {
  email: '',
  loggedIn: false // Is user logged in?
};

// Auth action reducers
export let auth = (state = initialAuthState, action) => {
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

const initialSearchState = [
  {
    type: 'general',
    search: ''
  }
];

// Adding search filters
export let searches = (state = initialSearchState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TYPE:
      return state.map((search, index) => {
        if (index === action.index) {
          return {
            ...search,
            type: action.newType
          }
        }

        return search;
      });
    case CHANGE_SEARCH_TEXT:
      return state.map((search, index) => {
          if (index === action.index) {
            return {
              ...search,
              search: action.text
            }
          }

          return search;
        });
    default:
      return state;
  }
};

export let rootReducer = combineReducers({auth, searches});