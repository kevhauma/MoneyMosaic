import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  ScrollArea,
  SimpleSelect,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/libs/shadCn';

import { CsvData } from '@/libs/utils';
import { Select } from '@radix-ui/react-select';
import { useState } from 'react';
import { UseStateReturnType } from '@/types';
import { DATE_FORMAT, stringToDate } from '@/feature-dates';
import {
  PreviewTable,
  TableConfig,
} from '@/libs/shadCn/components/custom/Table/PreviewTable';

type Props = {
  legendValue: Array<string>;
  csvData: Array<CsvData>;
  dateFieldState: UseStateReturnType<string>;
  dateFormatState: UseStateReturnType<string>;
};

export const DateFieldStep = ({
  legendValue,
  csvData,
  dateFieldState,
  dateFormatState,
}: Props) => {
  const [dateField, setDateField] = dateFieldState;
  const [dateFormat, setDateFormat] = dateFormatState;

  const [localDateField, setLocalDateField] = useState(dateField || 'Datum');
  const [localDateFormat, setLocalDateFormat] = useState(
    dateFormat || DATE_FORMAT.day_month_fullYear_slashes
  );

  const onOk = () => {
    setDateField(localDateField);
    setDateFormat(localDateFormat);
  };
  const previewConfig: TableConfig<CsvData> = [
    { field: localDateField, headerName: 'Csv Date Data' },
    {
      field: localDateField,
      headerName: 'Parsed Date Data',
      width: 300,
      render: (row) => (
        <>
          {stringToDate(row[localDateField], localDateFormat)
            ?.toDate()
            .toLocaleString() || '-'}
        </>
      ),
    },
  ];
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Configure Amount Field</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Flex className="gap-4 py-2">
          <SimpleSelect
            label="Date Field"
            value={localDateField}
            onChange={setLocalDateField}
            options={legendValue}
          />
          <SimpleSelect
            label="Date Format"
            value={localDateFormat}
            onChange={setLocalDateFormat}
            options={Object.values(DATE_FORMAT)}
          />
        </Flex>
        {(csvData.length || undefined) && (
          <>
            preview:
            <PreviewTable columns={previewConfig} rows={csvData.slice(0, 20)} />
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onOk}>Save</Button>
      </CardFooter>
    </Card>
  );
};
