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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/libs/shadCn';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { CsvData, stringToFloat } from '@/libs/utils';
import { Select } from '@radix-ui/react-select';
import { useEffect, useState } from 'react';
import { UseStateReturnType } from '@/types';

type Props = {
  legendValue: Array<string>;
  csvData: Array<CsvData>;
  amountFieldState: UseStateReturnType<string>;
  debitFieldState: UseStateReturnType<string>;
  amountSeperatorState: UseStateReturnType<string>;
  debitSeperatorState: UseStateReturnType<string>;
};

export const DebitFieldStep = ({
  legendValue,
  csvData,
  amountFieldState,
  debitFieldState,
  amountSeperatorState,
  debitSeperatorState,
}: Props) => {
  const [amountField, setAmountField] = amountFieldState;
  const [debitField, setDebitField] = debitFieldState;
  const [amountSeperator, setAmountSeperator] = amountSeperatorState;
  const [debitSeperator, setDebitSeperator] = debitSeperatorState;

  const [isSeperateDebitField, setIsSeperateDebitField] = useState(false);
  const [localAmountField, setLocalAmountField] = useState(
    amountField || 'credit'
  );
  const [localDebitField, setLocalDebitField] = useState(debitField || 'debet');
  const [localAmountSeperator, setLocalAmountSeperator] = useState(
    amountSeperator || ','
  );
  const [localDebitSeperator, setLocalDebitSeperator] = useState(
    debitSeperator || ','
  );

  const onOk = () => {
    setAmountField(localAmountField);
    setDebitField(localDebitField);
    setAmountSeperator(localAmountSeperator);
    setDebitSeperator(localDebitSeperator);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Configure Amount Field</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Flex className="gap-4 py-2">
          <Flex vertical>
            Debit Field
            <Select
              value={localAmountField}
              onValueChange={setLocalAmountField}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {legendValue.map((legend) => (
                    <SelectItem value={legend}>{legend}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Flex>
          <Flex vertical>
            Decimal Seperator
            <Input
              value={localAmountSeperator}
              onChange={(e) => setLocalAmountSeperator(e.currentTarget.value)}
            />
          </Flex>
          <Flex vertical>
            Enable Debit field
            <Switch
              checked={isSeperateDebitField}
              onCheckedChange={setIsSeperateDebitField}
            />
          </Flex>
          {isSeperateDebitField && (
            <>
              <Flex vertical>
                Debit Field
                <Select
                  value={localDebitField}
                  onValueChange={setLocalDebitField}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {legendValue.map((legend) => (
                        <SelectItem value={legend}>{legend}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Flex>
              <Flex vertical>
                Decimal Seperator
                <Input
                  value={localAmountSeperator}
                  onChange={(e) =>
                    setLocalDebitSeperator(e.currentTarget.value)
                  }
                />
              </Flex>
            </>
          )}
        </Flex>

        {(csvData.length || undefined) && (
          <>
            <Flex className="gap-2 hover:cursor-help">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InformationCircleIcon className="w-5 h-5 text-gray-800" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      if there are empty rows, consider toggling the seperate
                      credit field
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              preview:
            </Flex>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Csv Debit Data</TableHead>
                    <TableHead className="w-[100px]">
                      Parsed Debit Data
                    </TableHead>
                    {isSeperateDebitField && (
                      <>
                        <TableHead className="w-[100px]">
                          Csv Debit Data
                        </TableHead>
                        <TableHead className="w-[100px]">
                          Parsed Debit Data
                        </TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.slice(0, 10).map((csvObject, i) => (
                    <TableRow key={`table-row-${i}`}>
                      <TableCell className="w-[100px]">
                        <ScrollArea className="h-[25px] w-[100px]">
                          {csvObject[localAmountField] || '-'}
                        </ScrollArea>
                      </TableCell>
                      <TableCell className="w-[100px]">
                        <ScrollArea className="h-[25px] w-[100px]">
                          {stringToFloat(
                            csvObject[localAmountField],
                            localAmountSeperator
                          ) || '-'}
                        </ScrollArea>
                      </TableCell>
                      {isSeperateDebitField && (
                        <>
                          <TableCell className="w-[100px]">
                            <ScrollArea className="h-[25px] w-[100px]">
                              {csvObject[localDebitField] || '-'}
                            </ScrollArea>
                          </TableCell>
                          <TableCell className="w-[100px]">
                            <ScrollArea className="h-[25px] w-[100px]">
                              {stringToFloat(
                                csvObject[localDebitField],
                                localDebitSeperator
                              ) || '-'}
                            </ScrollArea>
                          </TableCell>
                        </>
                      )}
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
