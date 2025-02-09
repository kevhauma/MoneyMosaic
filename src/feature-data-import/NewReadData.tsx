import { Button, Step, Stepper } from '@/libs/shadCn';
import { useState } from 'react';
import { ImportDataStep } from './inputSteps/ImportDataStep';
import { useHistory } from '@/feature-data-store';
import Link from 'next/link';
import { stringToDate } from '@/feature-dates';
import { DebitFieldStep } from './inputSteps/DebitFieldStep';
import { DateFieldStep } from './inputSteps/DateFieldStep';
import { stringToFloat } from '@/libs/utils';
import { TransferFieldStep } from './inputSteps/TransferFieldStep';
import { useAccounts } from '@/feature-data-store/useAccounts';
import { AccountHistoryEntryType } from '@/types';

export const NewReadData = () => {
  const { addEntries } = useHistory();
  const { setSetting } = useAccounts();

  const [csvData, setCsvData] = useState<Array<{ [k: string]: string }>>([]);

  const [fieldLegend, setFieldLegend] = useState<Array<string>>([]);

  const amountFieldState = useState<string>();
  const debitFieldState = useState<string>();
  const amountSeperatorState = useState<string>();
  const debitSeperatorState = useState<string>();

  const dateFieldState = useState<string>();
  const dateFormatState = useState<string>();

  const accountFieldState = useState<string>();
  const accountNameState = useState<string>();

  const recipientFieldState = useState<string>();
  const recipientNameState = useState<string>();

  const descriptionFieldState = useState<string>();

  const [amountField] = amountFieldState;
  const [debitField] = debitFieldState;
  const [amountSeperator] = amountSeperatorState;
  const [debitSeperator] = debitSeperatorState;

  const [dateField] = dateFieldState;
  const [dateFormat] = dateFormatState;

  const [accountField] = accountFieldState;
  const [accountName] = accountNameState;
  const [recipientField] = recipientFieldState;
  const [recipientName] = recipientNameState;
  const [descriptionField] = descriptionFieldState;

  const onReady = () => {
    if (
      !amountField ||
      !debitField ||
      !dateField ||
      !accountField ||
      !recipientField ||
      !accountName ||
      !recipientName ||
      !descriptionField
    )
      return;
    const entries: AccountHistoryEntryType[] = csvData.map((obj) => {
      const entry = {
      amount:
        stringToFloat(obj[amountField], amountSeperator || ',') ||
        stringToFloat(obj[debitField], debitSeperator || ',') ||
        0,
      date: stringToDate(obj[dateField], dateFormat),
      account: { identifier: obj[accountField], name: obj[accountName] },
      recipient: { identifier: obj[recipientField], name: obj[recipientName] },
      description: obj[descriptionField],
      rawData: obj,
    }
    if(entry.recipient.name) return entry
    
    if(entry.description.includes('GOOGLE PAY') || entry.description.includes('BETALING VIA BANCONTACT') || entry.description.includes("BETALING AANKOPEN")){
      const [first, second] = entry.description.split("UUR")
      const [name, last] = (second||first).split("MET")
      entry.recipient.name = (name||last).trim()
    }
    if(entry.description.includes('GELDOPNEMING')||entry.description.includes('STORTING')){
      const [first, second] = entry.description.split("UUR")
      const [name, last] = (second||first).split("MET")
      entry.recipient.name = `CASH: ${(name||last).trim()}`
    }
    if(entry.description.includes('PAYPAL')){
      entry.recipient.name = `PAYPAL`
    }
  
    return entry
  });

    

    const accounts = entries.reduce((uniqueAccounts,entry)=>{
      uniqueAccounts[entry.account.identifier] = entry.account.name!

      return uniqueAccounts
    },{} as Record<string,string>)

    Object.entries(accounts)
    .forEach(([key,name])=>setSetting(key,{name}))

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
        <Step
          id="transfer"
          label="Transfer Field"
          isValid={Boolean(accountField && recipientField)}
        >
          <TransferFieldStep
            csvData={csvData}
            legendValue={fieldLegend}
            accountFieldState={accountFieldState}
            accountNameState={accountNameState}
            recipientFieldState={recipientFieldState}
            recipientNameState={recipientNameState}
            descriptionFieldState={descriptionFieldState}
          />
        </Step>
        <Step id="summary" label="Summary">
          Summary Field
        </Step>
      </Stepper>
    </div>
  );
};

