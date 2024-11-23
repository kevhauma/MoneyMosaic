export const isInbetween = (number: number, start: number, end: number) =>
  start <= number && number <= end;

export const stringToFloat = (str?: string, decimalSeperator?: string) => {
  const float = parseFloat(str?.replace(decimalSeperator || '.', '.') || '');
  return isNaN(float) ? null : float;
};
