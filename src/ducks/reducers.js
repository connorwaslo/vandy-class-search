import {
  LOGIN_EMAIL,
  CHANGE_AUTH_STATUS,
  LOG_OUT,
  CHANGE_SEARCH_TYPE,
  CHANGE_SEARCH_TEXT,
  ADD_SEARCH,
  REMOVE_SEARCH,
  SEARCH_RESULTS,
  CHANGE_PAGE,
  ADD_CLASS_TAKEN,
  REMOVE_CLASS_TAKEN,
  SET_TOTAL_PAGES,
  ADD_SCHEDULE,
  REMOVE_SCHEDULE,
  ADD_CLASS_TO_SCHEDULE,
  REMOVE_CLASS_FROM_SCHEDULE,
  CHANGE_SCHEDULE_SELECTION,
  CHANGE_SCHEDULE_NAME, LOAD_CLASS_TO_SCHEDULE_FROM_DATABASE
} from "./actionTypes";
import {combineReducers} from "redux";
import {guid} from "react-agenda";
import {getRandomInt} from "../utils/Utils";

const initialAuthState = {
  email: '',
  loggedIn: false, // Is user logged in?
  selectSchedule: 0
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
    case CHANGE_SCHEDULE_SELECTION:
      return {
        ...state,
        selectSchedule: action.index
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
const initialScheduleState = [];

let schedules = (state = initialScheduleState, action) => {
  // console.log('preswitch:', state);
  switch (action.type) {
    case ADD_SCHEDULE:
      return [
          ...state,
        {
          name: action.name,
          courses: {
            0: true
          }
        }
      ];
    case CHANGE_SCHEDULE_NAME:
      state[action.index].name = action.newName;

      return state;
    case REMOVE_SCHEDULE:
      delete state[action.name];
      return state;
    case ADD_CLASS_TO_SCHEDULE:
      let scheduleCourses = state[action.index].courses;

      // Check and see if class already exists
      let exists = false;
      Object.keys(scheduleCourses).forEach(key => {
        if (scheduleCourses[key].name === action.course) exists = true;
      });
      if (exists) {
        return state;
      }

      let courseIndex = 0;
      // If not a blank schedule, then the next index is the last key + 1
      if (scheduleCourses[0] !== true) {
        let courseKeys = Object.keys(scheduleCourses);
        courseIndex = parseInt(courseKeys[courseKeys.length - 1]) + 1; // The index is now the last key + 1
      }

      // TRUE = MWF, FALSE = TR
      let randDays = getRandomInt(0, 1) === 1;
      let randStartHour = getRandomInt(8, 17);

      // Add MWF courses
      let addClass;
      if (randDays) {
        addClass = Object.assign({}, state[action.index].courses, {
          [courseIndex]: {
            _id: guid(),
            name: action.course,
            startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), randStartHour, 10),
            endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), randStartHour + 1, 0),
            freq: 'MWF'
          },
          [courseIndex + 1]: {
            _id: guid(),
            name: action.course,
            startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, randStartHour, 10),
            endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, randStartHour + 1, 0),
            freq: 'MWF'
          },
          [courseIndex + 2]: {
            _id: guid(),
            name: action.course,
            startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, randStartHour, 10),
            endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, randStartHour + 1, 0),
            freq: 'MWF'
          }
        });
      } else {
        // TR courses
        addClass = Object.assign({}, state[action.index].courses, {
          [courseIndex]: {
            _id: guid(),
            name: action.course,
            startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, randStartHour, 10),
            endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, randStartHour + 1, 0),
            freq: 'TR'
          },
          [courseIndex + 1]: {
            _id: guid(),
            name: action.course,
            startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, randStartHour, 10),
            endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, randStartHour + 1, 0),
            freq: 'TR'
          }
        });
      }

      return state.map((item, index) => {
        if (index === action.index) {
          return {
            name: state[action.index].name,
            courses: addClass
          }
        }

        return item;
      });
    case REMOVE_CLASS_FROM_SCHEDULE:
      let removedClass = {};
      Object.keys(state[action.index].courses).forEach(key => {
        if (state[action.index].courses[key].name !== action.course) {
          removedClass[key] = state[action.index].courses[key]
        }
      });

      // Final check
      if (Object.keys(removedClass).length === 0) {
        removedClass = {0: true};
      }

      // Just update the courses for this schedule
      return state.map((item, index) => {
        if (index !== action.index) {
          return item;
        }

        return {
          name: item.name,
          courses: removedClass
        }
      });
    case LOAD_CLASS_TO_SCHEDULE_FROM_DATABASE:
      let keys = Object.keys(state[action.index].courses);
      let index = state[action.index].courses[0] === true ? 0 : parseInt(keys[keys.length - 1]) + 1;
      // Todo: Do some due diligence and make sure that the dates are Date objects

      let addCourses = Object.assign({}, state[action.index].courses, {
        [index]: action.course
      });
      console.log('addCourses:', addCourses);

      return state.map((item, index) => {
        if (index === action.index) {
          return {
            name: state[action.index].name,
            courses: addCourses
          }
        }

        return item;
      });
    default:
      return state;
  }
};

export let rootReducer = combineReducers({
  auth, searches, results, courses, schedules
});