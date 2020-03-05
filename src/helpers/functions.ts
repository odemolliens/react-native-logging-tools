
/**
 * Check if the given object is a function
 *
 *
 * @param func object to check
 * @return return true if it's a function, otherwise return false
 */
const isFunction = (func: any) =>
  func &&
  (Object.prototype.toString.call(func) === '[object Function]' ||
    'function' === typeof func ||
    func instanceof Function);
