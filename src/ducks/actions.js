import {LOGIN_EMAIL} from "./actionTypes";

export let loginEmail = email => {
  return {
    type: LOGIN_EMAIL,
    email
  };
};