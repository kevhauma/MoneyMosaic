import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';

type stringToTypeFunction<T> = (p1: string) => T;
interface ToStringable {
  toString: () => string;
}

type ValueType<T, U> = U extends undefined ? string : T;

type HookReturnType<T, U> = [value: ValueType<T, U>, setValue: (p1: T) => void];

//when no types are given, returnType of value is a string
export function useQueryParams<T extends undefined, U extends undefined>(
  paramName: string
): HookReturnType<string, undefined>;

//when Type is not undefined, you HAVE to give
export function useQueryParams<
  T extends ToStringable,
  U extends stringToTypeFunction<T> = stringToTypeFunction<T>
>(paramName: string, get: U): HookReturnType<T, U>;

export function useQueryParams<
  T extends ToStringable,
  U extends stringToTypeFunction<T> | undefined = stringToTypeFunction<T>
>(paramName: string, get?: U): HookReturnType<T, U> {
  const getRef = useRef(get);
  const router = useRouter();
  const currentPathname = usePathname();
  const searchParams = useSearchParams();
  const paramString = searchParams.get(paramName) || '';

  const urlValue = useMemo(() => {
    return (
      getRef.current ? getRef.current(paramString) : paramString
    ) as ValueType<T, U>;
  }, [paramString]);

  const createQueryString = useCallback(
    (name: string, value: T) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  const setUrlValue = (newValue: T) => {
    const newQueryParams = createQueryString(paramName, newValue);
    router.push(`${currentPathname}?${newQueryParams}`);
  };
  return [urlValue, setUrlValue];
}
