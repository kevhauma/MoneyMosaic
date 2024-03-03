import { dateToString, stringToDate } from '@/feature-dates';
import { isDefined } from '@/libs/utils';
import { AccountHistoryEntryType } from '@/types';
import { useRecoilState } from 'recoil';
import { historyAtom } from './historyAtom';
import dayjs from 'dayjs';
import { useMemo } from 'react';

type FilterType = {
  accounts?: string[];
  dateRange?: {
    from?: dayjs.Dayjs;
    to?: dayjs.Dayjs;
  };
};

export const useHistory = () => {
  const [history, setHistory] = useRecoilState(historyAtom);

  const memodHistory = useMemo(
    () =>
      history
        .map(({ key, date, ...entry }) => ({
          ...entry,
          date: stringToDate(date),
        }))
        .toSorted((a, b) => (a.date?.isAfter(b.date) ? 1 : -1)),
    [history]
  );

  const getHistory = (filter?: FilterType) => {
    return memodHistory;
  };

  const addEntries = (newEntries: AccountHistoryEntryType[]) => {
    const existingKeys = history.map((entry) => entry.key);
    const mappedEntries = newEntries
      .map((entry) => {
        const key = `${dateToString(entry.date)}-${entry.account}-${
          entry.recipient
        }-${entry.amount}`;

        if (existingKeys.includes(key)) return null;
        return { ...entry, key, date: dateToString(entry.date) || '' };
      })
      .filter(isDefined);

    setHistory((prev) => [...prev, ...mappedEntries]);
  };

  return { getHistory, addEntries };
};
