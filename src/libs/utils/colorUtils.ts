export const decimalToHexString = (decimal: number) => {
  return !isNaN(decimal)
    ? `#${decimal.toString(16).padStart(6, '0').toUpperCase()}`
    : undefined;
};
export const hexStringToDecimal = (hexString: string) => {
  const decimal = parseInt(hexString.replace('#', ''), 16);
  return isNaN(decimal) ? null : decimal;
};
