import {
  LOGIN_EMAIL, CHANGE_AUTH_STATUS, LOG_OUT,
  CHANGE_SEARCH_TYPE, CHANGE_SEARCH_TEXT
} from "./actionTypes";

const initialState = {
  email: '',
  loggedIn: false, // Is user logged in?
  searches: [{
    type: 'general',
    search: ''
  }],
  test: 'what'
};

// Auth action reducers
export let login = (state = initialState, action) => {
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

// Adding search filters
export let searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TYPE:
      return Object.assign({}, state, {
        searches: state.searches.map((search, index) => {
          if (index === action.index) {
            return Object.assign({}, search, {
              type: search.type
            });
          }

          return search;
        })
      });
    case CHANGE_SEARCH_TEXT:
      return Object.assign({}, state, {
        searches: state.searches.map((search, index) => {
          if (index === action.index) {
            return Object.assign({}, search, {
              search: search.search
            });
          }

          return search;
        })
      });
    default:
      return state;
  }
};