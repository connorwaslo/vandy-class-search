import {
  LOGIN_EMAIL, CHANGE_AUTH_STATUS, LOG_OUT,
  CHANGE_SEARCH_TYPE, CHANGE_SEARCH_TEXT, ADD_SEARCH, REMOVE_SEARCH,
  SEARCH_RESULTS, CHANGE_PAGE
} from "./actionTypes";
import {combineReducers} from "redux";

const initialAuthState = {
  email: '',
  loggedIn: false // Is user logged in?
};

// Auth action reducers
let auth = (state = initialAuthState, action) => {
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
let searches = (state = initialSearchState, action) => {
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
    case ADD_SEARCH:
      return [
          ...state.slice(0, action.index),
          {
            type: 'general',
            search: ''
          },
          ...state.slice(action.index)
        ];
    case REMOVE_SEARCH:
      // I don't really know why this actually updates state while splice does not but oh well
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
};

// Initial search results state
const initialResultsState = {
  validCourses: {},
  page: 1
};

let results = (state = initialResultsState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return {
        ...state,
        validCourses: action.results
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
};

export let rootReducer = combineReducers({auth, searches, results});