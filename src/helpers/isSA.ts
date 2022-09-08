export function isStandardAction<T extends { type: string }>(action: T) {
  return (
    isPlainObject(action) &&
    isString(action.type) &&
    Object.keys(action).every(isValidKey)
  );
}

const isPlainObject = (obj: object) =>
  obj != null &&
  typeof obj == 'object' &&
  Object.getPrototypeOf(obj) == Object.prototype;

function isString(x: string) {
  return Object.prototype.toString.call(x) === '[object String]';
}

export function isError(action: any) {
  return isStandardAction(action) && action.error === true;
}

function isValidKey(key: string) {
  return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;
}
