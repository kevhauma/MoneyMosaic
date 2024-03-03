import { Dayjs } from 'dayjs';
export type AccountHistoryEntryType = {
  date: Dayjs | null;
  amount: number;
  account: string;
  recipient: string;
};
