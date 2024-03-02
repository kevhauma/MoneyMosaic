import { theme as antTheme } from 'antd';
//import './themeTypes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const primary = {
  darker: '#4D8F86',
  main: '#07A092',
  light: '#EEF6F6',
};
const grey = {
  100: '#ffffff',
  200: '#F5F7F9',
  300: '#e0e0e0',
  400: '#A4A6A8',
  500: '#979797',
  // 300: '#f1f4f9',
  // 400: '#c6c6c6',
  // 500: '#999999',
  600: '#6c6c6c',
  700: '#3F4149',
  // 800: '#333333',
  // 900: '#2B2D38',
};

const secondary = {
  main: '#FFF',
};
const success = {
  main: '#07A092',
  light: '#EEF6F6',
};
const error = {
  main: '#DF3F59',
  light: '#faedeb',
};
const text = {
  primary: '#2B2D31',
  secondary: '#979797',
};

const background = {
  default: '#060402',
};

export const theme = {
  token: {
    colorPrimary: primary.main,
    colorSecondary: '#00ff00',
    colorTextBase: grey['100'],
    colorBgBase: background.default,
    colorSuccess: success.main,
    colorWarning: error.main,
    grey,
    primary,
    secondary,
    success,
    error,
    text,
    background,
  },
  algorithm: antTheme.darkAlgorithm,
};
