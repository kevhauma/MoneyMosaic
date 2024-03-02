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
    console.log(historyEntries);
    setData(historyEntries.sort((a, b) => (a.date > b.date ? 1 : -1)));
  };

  const dates = data.map((entry) => entry.date);
  const amounts = data.map((entry) => entry.amount);

  console.log(dates, amounts);

  const options = {
    title: {
      left: 'center',
      text: 'Graph',
    },

    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: dates,
    },
    yAxis: {
      type: 'value',
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
        symbol: 'none',
        sampling: 'lttb',
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
