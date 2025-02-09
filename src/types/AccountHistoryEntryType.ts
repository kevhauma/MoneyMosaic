import { Dayjs } from 'dayjs';
export type AccountType = {
  identifier: string;
  name?: string;
};
export type AccountHistoryEntryType = {
  date: Dayjs | null;
  amount: number;
  account: AccountType;
  recipient: AccountType;
  description?: string;
  rawData: Record<string,string>
};
