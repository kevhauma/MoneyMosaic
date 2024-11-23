export const safeFieldAccess = <T extends object>(
  row: T,
  field: keyof T
): string | number | null => {
  return field in row ? (row[field] as string | number | null) : null;
};
