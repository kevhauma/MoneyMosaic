import { useRecoilState } from 'recoil';
import {
  accountSettingsAtom,
  AccountSettingsType,
} from './AccountSettingsAtom';

export const useAccounts = () => {
  const [accounts, setAccounts] = useRecoilState(accountSettingsAtom);

  const getAccounts = () => {
    return accounts;
  };

  const setSetting = (accountKey: string, setting: AccountSettingsType) => {
    const existingKeys = accounts.map((entry) => entry.key);

    if (existingKeys.includes(accountKey)) {
      const { true: foundSettings, false: otherSettings } = Object.groupBy(
        accounts,
        (accountEntry) => `${accountEntry.key === accountKey}`
      );
      const foundSetting = structuredClone(foundSettings?.at(0));
      if (!foundSetting) return;

      foundSetting.value = setting;
      setAccounts([...(otherSettings || []), foundSetting]);
    } else
      setAccounts((prev) => [
        ...(prev || []),
        { key: accountKey, value: setting },
      ]);
  };

  return { getAccounts, setSetting };
};
