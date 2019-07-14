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