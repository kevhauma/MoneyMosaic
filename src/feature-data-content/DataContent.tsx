'use client';
import { useHistory } from '@/feature-data-store';
import { dateToString, stringToDate } from '@/feature-dates';
import { Button, Card, Flex } from '@/libs/shadCn';
import { AccountHistoryEntryType } from '@/types';
import dayjs, { Dayjs } from 'dayjs';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { useMemo, useState } from 'react';

import Link from 'next/link';
import { useAccounts } from '@/feature-data-store/useAccounts';
import { AccountSettings } from '@/feature-account-settings';
import { HistoryEntryDetail } from '@/feature-history-entry-detail';
import { HistoryList } from '@/feature-history-entry-detail/HistoryList';
const account_start_saldo = {
  BE55731028883844: 718.16, //1669.18,
  BE70746031270525: 0, //6970.55,
};

const colors = ['#FF4683', '#F0B67F', '#D6D1B1', '#C7EFCF', '#EEF5DB'];
type PreGraphEntryType = { difference: number; date: dayjs.Dayjs };
type GraphEntryType = [string, number];
export const DataContent = () => {
  const { getHistory } = useHistory();
  const { getAccounts } = useAccounts();
  const accountSettings = getAccounts();
  const [accountFilter, setAccountFilter] = useState<Array<string>>([]);
  const [zoomFilter, setZoomFilter] = useState<{
    from: dayjs.Dayjs;
    to: dayjs.Dayjs;
  } | null>(null);

  console.time('getHistory');
  const historyEntries = getHistory();
  console.timeEnd('getHistory');
  console.log('history entries: ', historyEntries.length);
  const toggleAccountFilter = (account: string) => {
    if (accountFilter.includes(account)) {
      setAccountFilter((prevFilter) =>
        prevFilter.filter((acc) => acc !== account)
      );
    } else {
      setAccountFilter((prevFilter) => [...prevFilter, account]);
    }
  };
  const randomNumber = Math.floor(Math.random() * historyEntries.length);

  const randomEntry = historyEntries.at(randomNumber)!;
  console.log(historyEntries.length, randomNumber, randomEntry);
  const series = useMemo(() => {
    const startDate = historyEntries[0]?.date;
    const endDate = historyEntries[historyEntries.length - 1]?.date;

    console.time('grouping');
    const groupedByAccount = Object.groupBy(
      historyEntries,
      (entry) => entry.account.identifier
    );
    const groupedByDate = Object.groupBy(historyEntries, (entry) =>
      dateToString(entry.date)
    );

    console.timeEnd('grouping');
    console.time('blank-filling');
    const precalcSeries: Record<string, PreGraphEntryType[]> = {};

    for (
      let date = dayjs(startDate);
      endDate?.isAfter(date);
      date = date.add(1, 'day')
    ) {
      Object.keys(groupedByAccount).map((account) => {
        let dateTransactions = groupedByDate[dateToString(date)!]?.filter(
          ({ account: entryAccount }) => account === entryAccount.identifier
        );

        if (!precalcSeries[account])
          precalcSeries[account] = [] as PreGraphEntryType[];
        if (!dateTransactions?.length)
          precalcSeries[account].push({ difference: 0, date });
        else
          precalcSeries[account].push({
            difference: dateTransactions.reduce(
              (total, curr) => total + curr.amount,
              0
            ),
            date,
          });
      });
    }
    console.timeEnd('blank-filling');
    console.time('lists');

    const internalSeries = Object.entries(precalcSeries).map(
      ([account, entries]) => {
        const list = entries.reduce(
          (total, entry) => [
            ...total,
            [
              dateToString(entry.date) || '',
              parseFloat(
                (
                  entry.difference +
                  (total[total.length - 1]?.[1] ||
                    account_start_saldo[
                      account as keyof typeof account_start_saldo
                    ] ||
                    0)
                ).toFixed(2)
              ),
            ] as GraphEntryType,
          ],
          [] as Array<GraphEntryType>
        );
        return { account, list };
      }
    );
    console.timeEnd('lists');

    return internalSeries.toSorted((a, b) => (a.account > b.account ? -1 : 1));
  }, [historyEntries]);

  const onDataZoom = ({ start, end }: { start: number; end: number }) => {
    //  console.log({ start, end });
  };

  const options: EChartsOption = {
    tooltip: {
      // backgroundColor: 'var(--tw-bg-opacity)',
      textStyle: {
        //   color: '#fff',
      },
      trigger: 'axis',
    },
    title: {
      left: 'center',
      text: 'Graph',
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        formatter: (value: string) => dateToString(stringToDate(value)),
      },
    },
    darkMode: true,
    yAxis: {
      type: 'value',
    },
    dataZoom: [
      { type: 'inside', start: 0, end: 100 },
      { start: 0, end: 100 },
    ],
    series: series
      .filter(({ account }) =>
        accountFilter.length ? accountFilter.includes(account) : true
      )
      .map(({ account, list }, index) => ({
        name: account,
        type: 'line',
        stack: 'x',
        stackStrategy: 'all',
        symbol: 'none',
        connectNulls: true,
        markLine: {
          silent: true,
          symbol: 'none',
        },
        itemStyle: {
          color: colors[index % colors.length],
        },
        data: list,
      })),
  };

  return (
    <Flex vertical className="border max-h-full h-full">
      <Link replace href="/import">
        <Button>Import New Data</Button>
      </Link>
      <Flex>
        {series.map(({ account }) => {
          const accountText =
            accountSettings.find((acc) => acc.key === account)?.value.name ||
            account;
          return (
            <Button
              key={account}
              variant={
                !accountFilter.length || accountFilter.includes(account)
                  ? undefined
                  : 'secondary'
              }
              onClick={() => toggleAccountFilter(account)}
            >
              {accountText}
            </Button>
          );
        })}
      </Flex>
      <Card>
        <ReactECharts
          lazyUpdate={true}
          option={options}
          onEvents={{ dataZoom: onDataZoom }}
        />
      </Card>
      <AccountSettings />
      {/* {historyEntries.length > 0 && <HistoryEntryDetail entry={randomEntry} />} */}
      <Flex  vertical className=" flex-grow min-h-100 overflow-auto">
      <HistoryList/>
      </Flex>
    </Flex>
  );
};
