import { atom } from 'recoil';
import { localStorageEffect } from '@/libs/utils';
import { AccountHistoryEntryType } from '@/types';

export type extendedAccountHistoryType = Omit<
  AccountHistoryEntryType,
  'date'
> & {
  key: string;
  date: string;
};

export const historyAtom = atom({
  key: 'historyAtom', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects: [
    localStorageEffect<extendedAccountHistoryType[]>('saved_history', []),
  ],
});
