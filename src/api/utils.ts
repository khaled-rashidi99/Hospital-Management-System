import { camelCase, snakeCase, isArray, isPlainObject } from "lodash";

const keysToCamel = (obj: any): any => {
  if (isArray(obj)) {
    return obj.map((v) => keysToCamel(v));
  } else if (isPlainObject(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: keysToCamel(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

const keysToSnake = (obj: any): any => {
  if (isArray(obj)) {
    return obj.map((v) => keysToSnake(v));
  } else if (isPlainObject(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: keysToSnake(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

export { keysToCamel, keysToSnake };
