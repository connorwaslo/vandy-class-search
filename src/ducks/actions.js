import {
  LOGIN_EMAIL, CHANGE_AUTH_STATUS, LOG_OUT,
  CHANGE_SEARCH_TYPE, CHANGE_SEARCH_TEXT, ADD_SEARCH
} from "./actionTypes";

// Auth actions
export let loginEmail = email => {
  return {
    type: LOGIN_EMAIL,
    email
  };
};

export let changeAuthStatus = loginStatus => {
  return {
    type: CHANGE_AUTH_STATUS,
    loginStatus
  }
};

export let logOut = () => {
  return {
    type: LOG_OUT
  }
};

// Search actions
export let changeSearchType = (newType, index) => {
  return {
    type: CHANGE_SEARCH_TYPE,
    newType,
    index
  };
};

export let changeSearchText = (text, index) => {
  return {
    type: CHANGE_SEARCH_TEXT,
    text,
    index
  }
};

export let addSearch = (index) => {
  return {
    type: ADD_SEARCH,
    index
  }
};