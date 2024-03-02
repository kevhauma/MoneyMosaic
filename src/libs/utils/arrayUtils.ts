/**
 * compares if arrays contains the same elements
 *  @returns boolean: true if equal
 */

export const compareArrays = <T>(a?: T[] | null, b?: T[] | null) => {
  if (!a || !b) return false;
  if (a === b) return true;
  if (a?.length !== b?.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return (
    sortedA.every((element, index) => element === sortedB[index]) &&
    sortedB.every((element, index) => element === sortedA[index])
  );
};

/**
 * compares if objects contains the same elements
 *  @returns boolean: true if equal
 */

export const compareObjects = <T extends object>(
  a?: T | null,
  b?: T | null
): boolean => {
  if (a === b) return true;
  if (!a || !b) return false;

  //have the same keys?
  if (!compareArrays(Object.keys(a), Object.keys(b))) return false;

  return Object.entries(a).every(([key, value]) => {
    if (typeof value === 'object')
      return compareObjects(value, b[key as keyof T]);
    return value === b[key as keyof T];
  });
};

type getNextType<T> = (currentItem: T) => T | null | undefined;

const getDepth = <T>(
  currentItem: T,
  currentDepth: number = 0,
  getNext: getNextType<T>
): number => {
  const nextItem = getNext(currentItem);
  if (!nextItem) return currentDepth;
  return getDepth(nextItem, ++currentDepth, getNext);
};

export const calculateDeepestDepth = <T>(
  array: T[],
  getNext: getNextType<T>
): number => {
  return !array.length
    ? 0
    : Math.max(...array.map((item) => getDepth(item, 0, getNext)));
};
