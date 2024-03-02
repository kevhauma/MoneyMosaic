export const shouldForwardProp =
  <Props extends object>(propsToOmit: (keyof Props)[]) =>
  (prop: string) =>
    !propsToOmit.map((propToOmit) => propToOmit.toString()).includes(prop);
