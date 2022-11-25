/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const getDateString = (value: string): string => {
  const year = value.substring(0, 4);
  const month = value.substring(4, 6);
  const day = value.substring(6, 8);
  return `${year}-${month}-${day}`;
};

export const getDayNumber = (start_date: string): number => {
  const valStr = getDateString(start_date);
  const date = new Date(valStr);
  return date.getDay();
};

export const getNumberAry = (start: number, count: number, max = 8, min = 1): Array => {
  const ary = [];

  for (let i = 0; i < count; i++) {
    const num = start + i < max && start + i >= min ? start + i : start + i + min - max;
    ary.push(num);
  }

  return ary;
};
