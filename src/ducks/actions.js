import {
  LOGIN_EMAIL, CHANGE_AUTH_STATUS, LOG_OUT,
  CHANGE_SEARCH_TYPE, CHANGE_SEARCH_TEXT
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

export let changeSearchType = newType => {
  return {
    type: CHANGE_SEARCH_TYPE,
    newType
  };
};

export let changeSearchText = text => {
  return {
    type: CHANGE_SEARCH_TEXT,
    text
  }
};