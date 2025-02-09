import dayjs from 'dayjs';

export const DATE_FORMAT = {
  fullYear_month_day_dashes: 'YYYY-MM-DD',
  year_month_day_dashes: 'YY-MM-DD',
  day_month_fullYear_dashes: 'DD-MM-YYYY',
  day_month_year_dashes: 'DD-MM-YY',
  fullYear_month_day_slashes: 'YYYY/MM/DD',
  year_month_day_slashes: 'YY/MM/DD',
  day_month_fullYear_slashes: 'DD/MM/YYYY',
  day_month_year_slashes: 'DD/MM/YY',
  fullYear_month_day_periods: 'YYYY.MM.DD',
  year_month_day_periods: 'YY.MM.DD',
  day_month_fullYear_periods: 'DD.MM.YYYY',
  day_month_year_periods: 'DD.MM.YY',
  ISO: 'YYYY-MM-DDTHH:mm:ssZ[Z]',
};
export const dateFormats = Object.values(DATE_FORMAT);

export const stringToDate = (datestring?: string, dateFormat?: string) => {
  const date = dayjs(
    datestring,
    dateFormat || DATE_FORMAT.fullYear_month_day_dashes
  );
  return date.isValid() ? date : null;
};
export const dateToString = (
  dayJsDate?: dayjs.Dayjs | null,
  stringFormat?: string
) => {
  const dateString = (dayJsDate || dayjs()).format(
    stringFormat || DATE_FORMAT.fullYear_month_day_dashes
  );
  return dateString;
};
