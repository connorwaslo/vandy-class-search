import {
  LOGIN_EMAIL, CHANGE_AUTH_STATUS, LOG_OUT,
  CHANGE_SEARCH_TYPE, CHANGE_SEARCH_TEXT, ADD_SEARCH, REMOVE_SEARCH,
  SEARCH_RESULTS, CHANGE_PAGE, ADD_CLASS_TAKEN, REMOVE_CLASS_TAKEN
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

export let addSearch = index => {
  return {
    type: ADD_SEARCH,
    index
  }
};

export let removeSearch = index => {
  return {
    type: REMOVE_SEARCH,
    index
  }
};

// Search results
export let setSearchResults = results => {
  return {
    type: SEARCH_RESULTS,
    results
  }
};

export let changePage = page => {
  return {
    type: CHANGE_PAGE,
    page
  }
};

// Mark classes as already taken/remove from taken list
export let setClassTaken = taken => {
  return {
    type: ADD_CLASS_TAKEN,
    taken
  }
};

export let removeClassTaken = code => {
  return {
    type: REMOVE_CLASS_TAKEN,
    code
  }
};