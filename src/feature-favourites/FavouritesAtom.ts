import { atom } from 'recoil';
import { localStorageEffect } from '@/libs/utils';

export const favouritesAtom = atom({
  key: 'favouritesAtom', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
  effects: [localStorageEffect<string[]>('saved_favourites', [])],
});
