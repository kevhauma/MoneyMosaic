import localforage from 'localforage';

type EffectProp<T> = {
  trigger: 'get' | 'set';
  setSelf: (p: T) => void;
  onSet: (p1: (newValue: T) => void) => void;
};
export const localStorageEffect =
  <T>(key: string, emptyValue: T) =>
  ({ setSelf, onSet, trigger }: EffectProp<T>) => {
    if (trigger === 'set') return;

    typeof window === 'undefined'
      ? undefined
      : localforage.getItem(key).then((savedValue) => {
          savedValue !== null
            ? setSelf(JSON.parse(savedValue as string) as T)
            : setSelf(emptyValue);
        });

    onSet((newValue: T) => {
      typeof window !== 'undefined' &&
        newValue !== undefined &&
        localforage.setItem(key, JSON.stringify(newValue));
    });
  };
