import { OpenFilesButton } from '@/feature-open-files';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  DialogClose,
  Flex,
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/libs/shadCn';
import { csvToArray } from '@/libs/utils';
import { useEffect, useState } from 'react';
type CsvData = { [k: string]: string };

type Props = {
  legendValue: Array<string>;
  csvValue: Array<CsvData>;
  onLegendChange: (p1: Array<string>) => void;
  onCsvChange: (p1: Array<CsvData>) => void;
};

export const ImportDataStep = ({
  legendValue,
  onLegendChange,
  csvValue,
  onCsvChange,
}: Props) => {
  const [delimiter, setDelimiter] = useState(';');
  const [header, setHeader] = useState(true);
  const [csvStrings, setCsvString] = useState<Array<string>>([]);
  const [localCsvObjects, setLocalCsvObjects] = useState<Array<CsvData>>([]);
  const [localLegend, setLocalLegend] = useState<Array<string>>([]);

  useEffect(() => {
    let newFieldLegend = legendValue;
    const csvObjects = csvStrings.flatMap((csv) => {
      const { legend, list } = csvToArray(csv, {
        delimiter,
        header,
      });
      newFieldLegend = legend;

      return list;
    });
    setLocalCsvObjects(csvObjects);
    setLocalLegend(newFieldLegend);
  }, [legendValue, csvStrings, delimiter, header]);

  const onDataRead = (csvs: string[]) => {
    setCsvString(csvs);
  };

  const onOk = () => {
    onLegendChange(localLegend);
    onCsvChange(localCsvObjects);
  };

  return (
    <Card className='h-full flex flex-col'>
      <CardHeader>
        <CardTitle>Import Csv data</CardTitle>
      </CardHeader>
      <CardContent className='flex-grow'>
        <OpenFilesButton fileTypes={['csv']} onOpen={onDataRead} />
        {(csvStrings.length || undefined) && (
          <>
          <Flex>
            <div className="m-1">
              <p className="text-sm text-muted-foreground">Csv files read:</p>
              <p className="text-sm font-medium leading-none">
                {csvStrings.length ?? ''}
              </p>
            </div>
            <div className="m-1">
              <p className="text-sm text-muted-foreground">Entries parsed:</p>
              <p className="text-sm font-medium leading-none">
                {localCsvObjects.length ?? ''}
              </p>
            </div>
            </Flex>
            preview:
            <ScrollArea className="h-[400px] w-[800px]">
            <Table>
              <TableHeader>
                <TableRow>
                  {localLegend.map((legend) => (
                    <TableHead key={`table-header-${legend}`} className="w-[100px]">
                      {legend}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {localCsvObjects.slice(0, 10).map((csvObject, i) => (
                  <TableRow key={`table-row-${i}`}>
                    {localLegend.map((legend) => (
                      <TableCell key={`table-cell-${i}-${legend}`} className="w-[100px]">
                       <ScrollArea className="h-[25px] w-[100px]"> {csvObject[legend]}</ScrollArea>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </ScrollArea>
          </>
        )}
      </CardContent>
      <CardFooter>
        <DialogClose asChild>
        <Button onClick={close}>close</Button>
        </DialogClose>
        <Button onClick={onOk} disabled={!csvStrings.length}>ok</Button>
      </CardFooter>
    </Card>
  );
};
