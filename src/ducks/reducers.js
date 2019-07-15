import {
  LOGIN_EMAIL, CHANGE_AUTH_STATUS, LOG_OUT,
  CHANGE_SEARCH_TYPE, CHANGE_SEARCH_TEXT, ADD_SEARCH, REMOVE_SEARCH,
  SEARCH_RESULTS, CHANGE_PAGE, ADD_CLASS_TAKEN, REMOVE_CLASS_TAKEN, SET_TOTAL_PAGES, ADD_SCHEDULE, REMOVE_SCHEDULE, ADD_CLASS_TO_SCHEDULE, REMOVE_CLASS_FROM_SCHEDULE
} from "./actionTypes";
import {combineReducers} from "redux";
import {guid} from "react-agenda";

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
  page: 1,
  totalPages: -1
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
    case SET_TOTAL_PAGES:
      console.log('Setting total pages to...', action.totalPages);
      return {
        ...state,
        totalPages: action.totalPages
      };
    default:
      return state;
  }
};

// State tracking classes
const initialCourseState = {
  takenCourses: []
};

let courses = (state = initialCourseState, action) => {
  switch (action.type) {
    case ADD_CLASS_TAKEN:
      return {
        ...state,
        takenCourses: [...state.takenCourses, action.taken]
      };
    case REMOVE_CLASS_TAKEN:
      let index = state.takenCourses.indexOf(action.code);
      return {
        ...state,
        takenCourses: [
          ...state.takenCourses.slice(0, index),
          ...state.takenCourses.slice(index + 1)
        ]
      };
    default:
      return state;
  }
};

// Handle schedules
let now = new Date();
const initialScheduleState = {
  // Todo: determine whether it's better to initialize a blank schedule or not
  'Schedule1': {
    courses: [
      {
        _id: guid(),
        name: 'SPAN 4455 Development of Drama',
        startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
        endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 5)
      }
    ]
  }
};

let schedules = (state = initialScheduleState, action) => {
  let newSched = state.schedules;
  switch (action.type) {
    case ADD_SCHEDULE:
      newSched[action.title] = {
        courses: []
      };

      return {
        schedules: newSched
      };
    case REMOVE_SCHEDULE:
      delete newSched[action.title];
      return newSched;
    case ADD_CLASS_TO_SCHEDULE:
      newSched[action.title].courses.append(action.course);
      return newSched;
    case REMOVE_CLASS_FROM_SCHEDULE:
      newSched[action.title].courses = newSched[action.title].courses.filter((obj) => {
        return !obj.name.includes(action.course);
      });

      return newSched;
    default:
      return state;
  }
};

export let rootReducer = combineReducers({
  auth, searches, results, courses, schedules
});