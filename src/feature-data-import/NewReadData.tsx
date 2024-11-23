import { Button, Step, Stepper } from '@/libs/shadCn';
import { AccountHistoryEntryType } from '@/types';
import { useState } from 'react';
import { ImportDataStep } from './inputSteps/ImportDataStep';
import { useHistory } from '@/feature-data-store';
import Link from 'next/link';
import { stringToDate } from '@/feature-dates';
import { DebitFieldStep } from './inputSteps/DebitFieldStep';
import { DateFieldStep } from './inputSteps/DateFieldStep';

export const NewReadData = () => {
  const { addEntries } = useHistory();

  const [csvData, setCsvData] = useState<Array<{ [k: string]: string }>>([]);

  const [fieldLegend, setFieldLegend] = useState([
    'credit',
    'debet',
    'Datum',
    'Rekeningnummer',
    'rekeningnummer tegenpartij',
  ]);

  const amountFieldState = useState<string>();
  const debitFieldState = useState<string>();
  const amountSeperatorState = useState<string>();
  const debitSeperatorState = useState<string>();

  const dateFieldState = useState<string>();
  const dateFormatState = useState<string>();

  const [amountField, setAmountField] = amountFieldState;
  const [debitField, setDebitField] = debitFieldState;
  const [amountSeperator, setAmountSeperator] = amountSeperatorState;
  const [debitSeperator, setDebitSeperator] = debitSeperatorState;

  const [dateField, setDateField] = dateFieldState;
  const [dateFormat, setDateFormat] = dateFormatState;

  const [accountField, setAccountField] = useState('Rekeningnummer');
  const [recipientField, setRecipientField] = useState(
    'rekeningnummer tegenpartij'
  );

  const onReady = () => {
    if (!amountField || !debitField || !dateField) return;
    const entries = csvData.map((obj) => ({
      amount:
        stringToFloat(obj[amountField], amountSeperator || ',') ||
        stringToFloat(obj[debitField], debitSeperator || ',') ||
        0,
      date: stringToDate(obj[dateField], dateFormat),
      account: obj[accountField],
      recipient: obj[recipientField],
    }));

    addEntries(entries);
  };

  return (
    <div className="w-full">
      <Link replace href="/start">
        <Button>back</Button>
      </Link>
      <Stepper defaultStep="input" onSubmit={onReady}>
        <Step
          id="input"
          label="Import Data"
          isValid={Boolean(csvData.length && fieldLegend.length)}
        >
          <ImportDataStep
            csvData={csvData}
            onCsvChange={setCsvData}
            legendValue={fieldLegend}
            onLegendChange={setFieldLegend}
          />
        </Step>
        <Step id="debit" label="Debit Field" isValid={Boolean(amountField)}>
          <DebitFieldStep
            csvData={csvData}
            legendValue={fieldLegend}
            amountFieldState={amountFieldState}
            debitFieldState={debitFieldState}
            amountSeperatorState={amountSeperatorState}
            debitSeperatorState={debitSeperatorState}
          />
        </Step>
        <Step id="date" label="Date Field" isValid={Boolean(dateField)}>
          <DateFieldStep
            csvData={csvData}
            legendValue={fieldLegend}
            dateFieldState={dateFieldState}
            dateFormatState={dateFormatState}
          />
        </Step>
        <Step id="transfer" label="Transfer Field"></Step>
        <Step id="summary" label="Summary">
          Summary Field
        </Step>
      </Stepper>
    </div>
  );
};
function stringToFloat(arg0: string, decimalSeperator: any): any {
  throw new Error('Function not implemented.');
}
