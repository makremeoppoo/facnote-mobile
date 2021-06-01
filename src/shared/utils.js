import R from 'ramda';

export const getMaxArryaValue = (array) => {
    return maximum(array.map((x) => x.value || 0));
  };
  
  function maximum(items) {
    return R.reduce(R.max, -Infinity, items);
  }
  
 export const getMinArryaValue = (array) => {
    return minimum(array.map((x) => x.value || 0));
  };
  
  function minimum(items) {
    return R.reduce(R.min, Infinity, items);
  }