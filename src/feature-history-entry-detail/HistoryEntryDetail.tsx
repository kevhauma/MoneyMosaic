import { dateToString } from '@/feature-dates';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, } from '@/libs/shadCn';
import { ChevronDown, ChevronUp } from "lucide-react";
import { AccountHistoryEntryType } from '@/types';
import dayjs from 'dayjs';
import { useState } from 'react';


type HistoryEntryDetailProps = {
  entry: AccountHistoryEntryType;
};

export const HistoryEntryDetail = ({ entry }: HistoryEntryDetailProps) => {
  console.log(entry)
  const [showRawData, setShowRawData] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isExpense = entry.amount < 0;

  return (
    <Card className="w-full max-w-lg shadow-lg p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex justify-between items-center">
          <span>{entry.recipient.name || entry.recipient.identifier}</span>
          <span
            className={`text-lg font-bold ${isExpense ? "text-red-500" : "text-green-500"}`}
          >
            {isExpense ? "-" : "+"}${Math.abs(entry.amount).toFixed(2)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {entry.description && (
          <p className="text-sm text-gray-600">
            {showFullDescription ? entry.description : `${entry.description.slice(0, 100)}...`}
            {entry.description.length > 100 && (
              <Button variant="link" size="sm" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Show less" : "Show more"}
              </Button>
            )}
          </p>
        )}
        <p className="text-xs text-gray-500">
          {entry.date ? dayjs(entry.date).format("MMM D, YYYY") : "Unknown date"}
        </p>
        <p className="text-xs text-gray-500">
          <strong>Account:</strong> {entry.account.name || entry.account.identifier}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setShowRawData(!showRawData)}
        >
          {showRawData ? <ChevronUp size={16} /> : <ChevronDown size={16} />} Raw Data
        </Button>
        {showRawData && (
          <div className="bg-gray-100 p-2 rounded-lg text-xs text-gray-700 overflow-auto">
            <pre>{JSON.stringify(entry, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
  
};
