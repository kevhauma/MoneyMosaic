import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Input,
  ScrollArea,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Csv Date Data</TableHead>
                    <TableHead className="w-[100px]">
                      Parsed Date Data
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.slice(0, 10).map((csvObject, i) => (
                    <TableRow key={`table-row-${i}`}>
                      <TableCell className="w-[100px]">
                        <ScrollArea className="h-[25px] w-[100px]">
                          {csvObject[localDateField] || '-'}
                        </ScrollArea>
                      </TableCell>
                      <TableCell className="w-[200px]">
                        <ScrollArea className="h-[25px] w-[200px]">
                          {stringToDate(
                            csvObject[localDateField],
                            localDateFormat
                          )
                            ?.toDate()
                            .toLocaleString() || '-'}
                        </ScrollArea>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onOk}>Save</Button>
      </CardFooter>
    </Card>
  );
};
