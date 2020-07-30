/**
 * Check if the given object is a function
 *
 *
 * @param func object to check
 * @return return true if it's a function, otherwise return false
 */
export const isFunction = (func: any) => func && typeof func === 'function';

/**
 * Get current date and hour
 * YYYY-MM-DD HH:MM
 *
 * @return return current date and hour
 */
export const getCurrentDateTime = (date = new Date()) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
