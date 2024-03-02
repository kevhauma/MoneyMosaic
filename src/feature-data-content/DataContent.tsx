'use client';
import { AccountHistoryEntryType } from '@/types';
import { Flex } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import { ReadData } from './ReadData';

export const DataContent = () => {
  const [data, setData] = useState<AccountHistoryEntryType[]>([
    { amount: 100, date: new Date(2024, 2, 2), account: 'default' },
  ]);

  const onReady = (historyEntries: AccountHistoryEntryType[]) => {
    console.log(historyEntries.length);
    historyEntries.sort((a, b) => (a.date > b.date ? 1 : -1));
    const startDate = historyEntries[0].date;
    const endDate = historyEntries[historyEntries.length - 1].date;
    for (
      let date = new Date(startDate);
      endDate.getTime() > date.getTime();
      date = new Date(date.setDate(date.getDate() + 1))
    ) {
      let dateTransactions = historyEntries.filter(
        ({ date: entryDate }) =>
          date.getFullYear() == entryDate.getFullYear() &&
          date.getMonth() == entryDate.getMonth() &&
          date.getDate() == entryDate.getDate()
      );

      if (dateTransactions.length == 0)
        historyEntries.push({ amount: null, date, account: '' });
    }
    console.log(historyEntries.length);

    setData(historyEntries.sort((a, b) => (a.date > b.date ? 1 : -1)));
  };

  const dates = data.map((entry) => entry.date.toDateString());
  const amounts = data.map((entry) => entry.amount);

  //console.log(dates, amounts);

  const options = {
    title: {
      left: 'center',
      text: 'Graph',
    },

    xAxis: {
      type: 'category',
      data: dates,
    },
    yAxis: {
      type: 'value',
      boundaryGap: true,
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        connectNulls: true,
        itemStyle: {
          color: 'rgb(255, 70, 131)',
        },
        data: amounts,
      },
    ],
  };

  return (
    <Flex vertical>
      <ReadData onReady={onReady} />
      <ReactECharts option={options} />
    </Flex>
  );
};
