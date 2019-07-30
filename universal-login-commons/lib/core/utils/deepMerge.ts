import {deepCopy} from './deepCopy';

export function deepMerge<T, U>(destination: T, source: U): T & U {
  const result = deepCopy(destination);
  for (const property in source) {
    if (isProperObject(source[property])) {
      result[property] = result[property] || {};
      result[property] = deepMerge(result[property], source[property]);
    } else {
      result[property] = source[property];
    }
  }
  return result;
}

export function isProperObject<T>(object: T): boolean {
  return typeof object === 'object' && object !== null;
}
