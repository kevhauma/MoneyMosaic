import { useMemo } from 'react';

type ValueOf<T> = T[keyof T];
type Entries<T> = [keyof T, ValueOf<T>][];
type BlackAndWhiteListType<T> = {
  blacklist?: Array<keyof T>;
  whitelist?: Array<keyof T>;
};
function objectEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

export const filterSingleObjectOnSearch = <T extends object>(
  entry: T,
  search?: string | null,
  lists?: BlackAndWhiteListType<T>
) =>
  objectEntries(entry)
    .filter(([key]) => {
      if (lists?.whitelist?.length)
        return lists.whitelist ? lists.whitelist.includes(key) : false;
      if (lists?.blacklist?.length)
        return lists.blacklist ? !lists.blacklist.includes(key) : true;
      return true;
    })
    .some(([key, entryField]) =>
      `${entryField}`.toLowerCase().includes(search?.toLowerCase() || '')
    );
export const filterObjectOnSearch = <T extends object>(
  array: T[] | undefined,
  search?: string | null,
  lists?: BlackAndWhiteListType<T>
) => {
  return (array || []).filter((entry) =>
    entry ? filterSingleObjectOnSearch(entry, search, lists) : false
  );
};

export const useFilterObjectOnSearch = <T extends object>(
  array: T[] | undefined,
  search?: string | null,
  lists?: BlackAndWhiteListType<T>
) => {
  return useMemo(() => {
    return filterObjectOnSearch(array || [], search, lists);
  }, [array, search, lists]);
};
