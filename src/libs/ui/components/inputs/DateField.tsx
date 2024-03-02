import * as React from 'react';
import { DatePicker, DatePickerProps } from 'antd';

export const DateField = ({ ...props }: DatePickerProps) => (
  <DatePicker {...props} />
);
