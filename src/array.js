// https://github.com/d3/d3-array/blob/master/src/extent.js
export function extent(values) {
  let min, max;
  for (const value of values) {
    if (value != null) {
      if (min === undefined) {
        if (value >= value) min = max = value;
      } else {
        if (min > value) min = value;
        if (max < value) max = value;
      }
    }
  }
  return [min, max];
}

// https://github.com/d3/d3-array/blob/master/src/merge.js
function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

export function merge(arrays) {
  return Array.from(flatten(arrays));
}
