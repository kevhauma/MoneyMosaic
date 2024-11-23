import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  SimpleSelect,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/libs/shadCn';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { CsvData, stringToFloat } from '@/libs/utils';
import { useState } from 'react';
import { UseStateReturnType } from '@/types';
import { SimpleInput } from '@/libs/shadCn/components/custom/SimpleInput';
import {
  PreviewTable,
  TableConfig,
} from '@/libs/shadCn/components/custom/Table/PreviewTable';

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

  const previewConfig: TableConfig<CsvData> = [
    { field: localAmountField, headerName: 'CSV amount Data' },
    {
      field: localAmountField,
      headerName: 'parsed amount Data',
      render: (row) => (
        <>{stringToFloat(row[localAmountField], localAmountSeperator) || '-'}</>
      ),
    },
  ];
  if (isSeperateDebitField) {
    previewConfig.push({
      field: localDebitField,
      headerName: 'CSV debit Data',
    });
    previewConfig.push({
      field: localDebitField,
      headerName: 'parsed debit Data',
      render: (row) => (
        <>{stringToFloat(row[localDebitField], localAmountSeperator) || '-'}</>
      ),
    });
  }
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
          <SimpleSelect
            label="Amount Field"
            value={localAmountField}
            onChange={setLocalAmountField}
            options={legendValue}
          />
          <SimpleInput
            label="Amount Seperator"
            value={localAmountSeperator}
            onChange={setLocalAmountSeperator}
          />
          <Flex vertical>
            Enable Debit field
            <Switch
              checked={isSeperateDebitField}
              onCheckedChange={setIsSeperateDebitField}
            />
          </Flex>
          {isSeperateDebitField && (
            <>
              <SimpleSelect
                label="Debit Field"
                value={localDebitField}
                onChange={setLocalDebitField}
                options={legendValue}
              />
              <SimpleInput
                label="Decimal Seperator"
                value={localDebitSeperator}
                onChange={setLocalDebitSeperator}
              />
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
            <PreviewTable rows={csvData.slice(0, 10)} columns={previewConfig} />
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onOk}>Save</Button>
      </CardFooter>
    </Card>
  );
};
