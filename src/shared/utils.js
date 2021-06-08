import R from 'ramda';

export const getMaxArrayValue = (array) => {
    return maximum(array.map((x) => x.value || 0));
  };
  
  function maximum(items) {
    return R.reduce(R.max, -Infinity, items);
  }
  
 export const getMinArrayValue = (array) => {
    return minimum(array.map((x) => x.value || 0));
  };
  
  function minimum(items) {
    return R.reduce(R.min, Infinity, items);
  }