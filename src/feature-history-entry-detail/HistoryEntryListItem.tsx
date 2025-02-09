import { Button, Card, Flex } from '@/libs/shadCn';
import { AccountHistoryEntryType } from '@/types';
import dayjs from 'dayjs';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { HistoryEntryDetail } from './HistoryEntryDetail';

export const HistoryListItem = ({
  entry,
}: {
  entry: AccountHistoryEntryType;
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const isExpense = entry.amount < 0;

  return (
    <Card>
      <Flex className="w-full p-3 justify-between">
        <Flex>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          
          onClick={() => setShowDetail((prev) => !prev)}
          >
          {showDetail ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
        <Flex vertical>
          <span className="text-sm font-medium">
            {entry.account.name || entry.account.identifier} →{" "}
            {entry.recipient.name || entry.recipient.identifier}
          </span>
          <span className="text-xs text-gray-500">
            {entry.date
              ? dayjs(entry.date).format('MMM D, YYYY')
              : 'Unknown date'}
          </span>
        </Flex>
        </Flex>
        <span
          className={`text-sm font-bold ${
            isExpense ? 'text-red-500' : 'text-green-500'
          }`}
          >
          {isExpense ? '-' : '+'}${Math.abs(entry.amount).toFixed(2)}
        </span>
      </Flex>
      {showDetail && 
        <HistoryEntryDetail entry={entry} />
      }
    </Card>
  );
};
