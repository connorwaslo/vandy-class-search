import {
  SET_EMAIL,
  CHANGE_AUTH_STATUS, LOG_OUT
} from "./actionTypes";

export let setEmail = email => {
  return {
    type: SET_EMAIL,
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