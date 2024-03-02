type CsvReaderOptions = {
  header?: boolean;
  delimiter?: string;
};
export const csvToArray = (csvString: string, options?: CsvReaderOptions) => {
  const hasHeader = options?.header || true;
  const delimiter = options?.delimiter || ',';

  const lines = csvString.split(/\r|\n/);

  let legend: string[] | undefined;

  if (hasHeader) {
    const firstline = lines.shift();
    legend = firstline?.split(delimiter);
  }

  if (!legend) {
    legend = lines[0].split(delimiter).map((d, i) => `${i}`);
  }

  let returnArray: { [k: string]: string }[] = [];
  lines.forEach((line) => {
    if (!line.trim()) return;

    let newObject: { [k: string]: string } = {};
    let data = line.split(delimiter);
    data.forEach((d, i) => {
      //@ts-ignore
      newObject[legend[i]] = d.trim();
    });
    returnArray.push(newObject);
  });

  return { legend, list: returnArray };
};
