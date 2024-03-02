'use client';

import { ColorPicker as AntColorPicker, ColorPickerProps } from 'antd';

export const ColorPicker = ({ ...props }: ColorPickerProps) => {
  return <AntColorPicker {...props} />;
};
