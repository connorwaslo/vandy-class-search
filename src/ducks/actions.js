import {
  LOGIN_EMAIL, CHANGE_AUTH_STATUS, LOG_OUT,
  CHANGE_SEARCH_TYPE, CHANGE_SEARCH_TEXT, ADD_SEARCH, REMOVE_SEARCH,
  SEARCH_RESULTS, CHANGE_PAGE, ADD_CLASS_TAKEN, REMOVE_CLASS_TAKEN, SET_TOTAL_PAGES, ADD_SCHEDULE, REMOVE_SCHEDULE, ADD_CLASS_TO_SCHEDULE, REMOVE_CLASS_FROM_SCHEDULE
} from "./actionTypes";

// Auth actions
export let loginEmail = email => {
  return {
    type: LOGIN_EMAIL,
    email
  };
};

export let changeAuthStatus = loginStatus => {
  console.log('changeAuthStatus');
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

export let setTotalPages = totalPages => {
  console.log('setTotalPages:', totalPages);
  return {
    type: SET_TOTAL_PAGES,
    totalPages
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

// Add/remove schedules
// Add/remove classes from individual schedules
export let addSchedule = title => {
  return {
    type: ADD_SCHEDULE,
    title
  }
};

export let removeSchedule = title => {
  return {
    type: REMOVE_SCHEDULE,
    title
  }
};

// title: Title of course
// course: Course code
export let addScheduleCourse = (title, course) => {
  return {
    type: ADD_CLASS_TO_SCHEDULE,
    title,
    course
  }
};

export let removeScheduleCourse = (title, course) => {
  return {
    type: REMOVE_CLASS_FROM_SCHEDULE,
    title,
    course
  }
};