import { atom } from 'recoil';
import { localStorageEffect } from '@/libs/utils';

export type AccountSettingsType =  {
  name: string;
};
export type AccountSettingAtomEntry = {
  key: string;
  value: AccountSettingsType;
}

export const accountSettingsAtom = atom({
  key: 'accountSettingsAtom', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects: [
    localStorageEffect<AccountSettingAtomEntry[]>('saved_accounts', []),
  ],
});
