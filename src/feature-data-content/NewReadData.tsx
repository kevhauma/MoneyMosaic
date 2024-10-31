import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/shadCn';
import { AccountHistoryEntryType } from '@/types';
import { useState } from 'react';
import { ImportDataStep } from './inputSteps/ImportDataStep';

type Props = {
  onReady: (p1: AccountHistoryEntryType[]) => void;
};

export const NewReadData = ({ onReady }: Props) => {

  const [csvData, setCsvData] = useState<Array<{ [k: string]: string }>>([]);

  const [fieldLegend, setFieldLegend] = useState([
    'credit',
    'debet',
    'Datum',
    'Rekeningnummer',
    'rekeningnummer tegenpartij',
  ]);

  const [amountField, setAmountField] = useState('credit');
  const [debetField, setDebetField] = useState('debet');
  const [dateField, setDateField] = useState('Datum');
  const [accountField, setAccountField] = useState('Rekeningnummer');
  const [recipientField, setRecipientField] = useState(
    'rekeningnummer tegenpartij'
  );

  return (
    <Tabs defaultValue="input" className="w-[800px] flex flex-col">
      <TabsList className="w-full flex justify-evenly">
        <TabsTrigger value="input" className="flex-grow">Import Data</TabsTrigger>
        <TabsTrigger value="debit" className="flex-grow">Debit Field</TabsTrigger>
        <TabsTrigger value="date" className="flex-grow">Date Field</TabsTrigger>
        <TabsTrigger value="account" className="flex-grow">Account Field</TabsTrigger>
        <TabsTrigger value="recipient" className="flex-grow">Recipient Field</TabsTrigger>
      </TabsList>
      <TabsContent value="input" className='flex-grow min-h-0'>
        <ImportDataStep csvValue={csvData} onCsvChange={setCsvData} legendValue={fieldLegend} onLegendChange={setFieldLegend} />
      </TabsContent>
      <TabsContent value="debit">Debit Field</TabsContent>
      <TabsContent value="date">Date Field</TabsContent>
      <TabsContent value="account">Account Field</TabsContent>
      <TabsContent value="recipient">Recipient Field</TabsContent>
    </Tabs>
  );
};
