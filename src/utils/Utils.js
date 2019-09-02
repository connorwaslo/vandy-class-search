// Designed to be used for state.results.validCourses
// Gets the count of all children/endpoints in this object
export const getObjectSize = obj => {
  let count = 0;
  let keys = Object.keys(obj);
  keys.forEach(key => {
    count += obj[key].length;
  });

  return count;
};

// Gets random integer from 0 to (inclusively) max
export const getRandomInt = (min, max) => {
  let rand = Math.random() * (max - min) + min;
  console.log('Random:', rand);
  return Math.round(rand);
};