import {
  DATE_FORMAT,
  dateFormats, stringToDate
} from '@/feature-dates';
import { OpenFilesButton } from '@/feature-open-files';
import { Dialog, DialogContent, DialogTrigger } from '@/libs/shadCn';
import { csvToArray } from '@/libs/utils';
import { AccountHistoryEntryType } from '@/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onReady: (p1: AccountHistoryEntryType[]) => void;
};

export const ReadData = ({ onReady }: Props) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seperateDebitField, setSeperateDebitField] = useState(false);
  const [decimalSeperator, setDecimalSeperator] = useState(',');
  const [dateFormat, setDateFormat] = useState(
    DATE_FORMAT.day_month_fullYear_slashes
  );
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

  const onDataRead = (csvs: string[]) => {
    const csvObjects = csvs.flatMap((csv) => {
      const { legend, list } = csvToArray(csv, {
        delimiter: ';',
        header: true,
      });
      setFieldLegend(legend);
      return list;
    });
    setCsvData(csvObjects);
    setIsModalOpen(true);
  };

  const convertData = () => {
    const mappedObjects = csvData.map((obj) => ({
      amount:
        stringToFloat(obj[amountField], decimalSeperator) ||
        stringToFloat(obj[debetField], decimalSeperator) ||
        0,
      date: stringToDate(obj[dateField], dateFormat),
      account: obj[accountField],
      recipient: obj[recipientField],
    }));

    onReady(mappedObjects);
    setIsModalOpen(false);
  };

  const legendOptions = fieldLegend.map((legend) => ({
    value: legend,
    label: legend,
  }));
  const dateFormatOptions = dateFormats.map((format) => ({
    value: format,
    label: format,
  }));

  const randomSamples = csvData.slice(0, 10);

  return (
    <Dialog>
      <DialogTrigger>
        <OpenFilesButton fileTypes={['csv']} onOpen={onDataRead} />
      </DialogTrigger>
      <DialogContent>
        {/* <Flex vertical>
          <Flex vertical>
            <Text> seperate debet field</Text>
            <Switch
              style={{ width: 100 }}
              value={seperateDebitField}
              onChange={(checked) => setSeperateDebitField(checked)}
              checkedChildren="seperate"
              unCheckedChildren="same"
            />
          </Flex>
          <Flex gap={16}>
            <Flex vertical>
              <Text>{t('amountField')}</Text>
              <Autocomplete
                placeholder="AmountField"
                options={legendOptions}
                value={amountField}
                onChange={setAmountField}
              />
              <Text>{t('decimal seperator')}</Text>
              <TextField
                value={decimalSeperator}
                onChange={(e) => setDecimalSeperator(e.currentTarget.value)}
              />
              <Text>{t('samples')}</Text>
              <Flex justify="space-between">
                <Text>{t('field')} </Text>
                <Text>{t('parsed')}</Text>
              </Flex>
              {randomSamples.map((sample, index) => (
                <Flex key={index} justify="space-between">
                  <Text>{sample[amountField]} </Text>
                  <Text>
                    {stringToFloat(sample[amountField], decimalSeperator)}{' '}
                  </Text>
                </Flex>
              ))}
            </Flex>
            {seperateDebitField && (
              <Flex vertical>
                <Text>{t('debetField')}</Text>
                <Autocomplete
                  placeholder="debetField"
                  options={legendOptions}
                  value={debetField}
                  onChange={setDebetField}
                />
                <Text>{t('samples')}</Text>
                <Flex justify="space-between">
                  <Text>{t('field')} </Text>
                  <Text>{t('parsed')}</Text>
                </Flex>
                {randomSamples.map((sample, index) => (
                  <Flex key={index} justify="space-between">
                    <Text>{sample[debetField]} </Text>
                    <Text>
                      {stringToFloat(sample[debetField], decimalSeperator)}{' '}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            )}
            <Flex vertical>
              <Text>{t('dateField')}</Text>
              <Autocomplete
                placeholder="DateField"
                options={legendOptions}
                value={dateField}
                onChange={setDateField}
              />
              <Text>{t('dateFormat')}</Text>
              <Autocomplete
                placeholder="DateField"
                options={dateFormatOptions}
                value={dateFormat}
                onChange={setDateFormat}
              />
              <Text>{t('samples')}</Text>
              <Flex justify="space-between">
                <Text>{t('field')} </Text>
                <Text>{t('parsed')}</Text>
              </Flex>
              {randomSamples.map((sample, index) => (
                <Flex key={index} justify="space-between">
                  <Text> {sample[dateField]} </Text>
                  <Text>
                    {' '}
                    {dateToString(
                      stringToDate(sample[dateField], dateFormat)
                    )}{' '}
                  </Text>
                </Flex>
              ))}
            </Flex>
            <Flex vertical>
              <Text>{t('accountField')}</Text>
              <Autocomplete
                placeholder="AccountField"
                options={legendOptions}
                value={accountField}
                onChange={setAccountField}
              />
              <Text>{t('samples')}</Text>
              {randomSamples.map((sample, index) => (
                <Flex key={index} justify="space-between">
                  <Text> {sample[accountField]} </Text>
                </Flex>
              ))}
            </Flex>
            <Flex vertical>
              <Text>{t('recipientField')}</Text>
              <Autocomplete
                placeholder="recipientField"
                options={legendOptions}
                value={recipientField}
                onChange={setRecipientField}
              />

              <Text>{t('samples')}</Text>

              {randomSamples.map((sample, index) => (
                <Flex key={index} justify="space-between">
                  <Text> {sample[recipientField]} </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex> */}
      </DialogContent>
    </Dialog>
  );
};

const stringToFloat = (str?: string, decimalSeperator?: string) => {
  const float = parseFloat(str?.replace(decimalSeperator || '.', '.') || '');
  return isNaN(float) ? null : float;
};
