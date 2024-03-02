import { OpenFilesButton } from '@/feature-open-files';
import { Autocomplete } from '@/libs/ui';
import { csvToArray } from '@/libs/utils/csvReader';
import { AccountHistoryEntryType } from '@/types';
import { Flex } from 'antd';
import { useState } from 'react';

type Props = {
  onReady: (p1: AccountHistoryEntryType[]) => void;
};

export const ReadData = ({ onReady }: Props) => {
  const [fieldLegend, setFieldLegend] = useState([
    'Saldo',
    'Datum',
    'RekeningNummer',
  ]);

  const [amountField, setAmountField] = useState('Saldo');
  const [dateField, setDateField] = useState('Datum');
  const [accountField, setAccountField] = useState('RekeningNummer');

  const convertData = (csvs: string[]) => {
    const csvObjects = csvs.flatMap((csv) => {
      const { legend, list } = csvToArray(csv, {
        delimiter: ';',
        header: true,
      });
      setFieldLegend(legend);
      return list;
    });

    const mappedObjects = csvObjects.map((obj) => ({
      amount: parseInt(obj[amountField]),
      date: new Date(stringToDate(obj[dateField])),
      account: obj[accountField],
    }));

    onReady(mappedObjects);
  };
  const legendOptions = fieldLegend.map((legend) => ({
    value: legend,
    label: legend,
  }));
  return (
    <Flex vertical>
      <Flex>
        <Autocomplete
          placeholder="AmountField"
          options={legendOptions}
          value={amountField}
          onChange={setAmountField}
        />
        <Autocomplete
          placeholder="DateField"
          options={legendOptions}
          value={dateField}
          onChange={setDateField}
        />
        <Autocomplete
          placeholder="AccountField"
          options={legendOptions}
          value={accountField}
          onChange={setAccountField}
        />
      </Flex>
      <OpenFilesButton fileTypes={['csv']} onOpen={convertData} />
    </Flex>
  );
};

const stringToDate = (str: string) => {
  const [day, month, year] = str.split('/').map((v) => parseInt(v));
  return new Date(year, month - 1, day);
};
