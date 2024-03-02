export const isDefined = <T>(data: T | undefined | null): data is T =>
  Boolean(data);
