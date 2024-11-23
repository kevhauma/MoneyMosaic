import { OpenFilesButton } from '@/feature-open-files';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Flex,
  Input,
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/libs/shadCn';
import { CsvData, csvToArray } from '@/libs/utils';
import { useEffect, useState } from 'react';

type Props = {
  legendValue?: Array<string>;
  csvData?: Array<CsvData>;
  onLegendChange: (p1: Array<string>) => void;
  onCsvChange: (p1: Array<CsvData>) => void;
};

export const ImportDataStep = ({
  legendValue,
  onLegendChange,
  csvData: csvValue,
  onCsvChange,
}: Props) => {
  const [delimiter, setDelimiter] = useState(';');
  const [header, setHeader] = useState(true);
  const [csvStrings, setCsvString] = useState<Array<string>>([]);
  const [localCsvObjects, setLocalCsvObjects] = useState<Array<CsvData>>(
    csvValue || []
  );
  const [localLegend, setLocalLegend] = useState<Array<string>>(
    legendValue || []
  );

  useEffect(() => {
    let newFieldLegend = localLegend;
    if (!csvStrings.length) return;

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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Import Csv data</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <OpenFilesButton fileTypes={['csv']} onOpen={onDataRead} />
        <Flex className="gap-4 py-2">
          <Flex vertical>
            Csv headers?
            <Checkbox
              checked={header}
              onCheckedChange={(checked) => {
                console.log(checked);
                setHeader(Boolean(checked));
              }}
            />
          </Flex>
          <Flex vertical>
            Csv Delimiter
            <Input
              value={delimiter}
              onChange={(e) => setDelimiter(e.currentTarget.value)}
            />
          </Flex>
        </Flex>
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
          </>
        )}
        {(localCsvObjects.length || undefined) && (
          <>
            preview:
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    {localLegend.map((legend) => (
                      <TableHead
                        key={`table-header-${legend}`}
                        className="w-[100px]"
                      >
                        {legend}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localCsvObjects.slice(0, 10).map((csvObject, i) => (
                    <TableRow key={`table-row-${i}`}>
                      {localLegend.map((legend) => (
                        <TableCell
                          key={`table-cell-${i}-${legend}`}
                          className="w-[100px]"
                        >
                          <ScrollArea className="h-[25px] w-[100px]">
                            {csvObject[legend] || '-'}
                          </ScrollArea>
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
        {localCsvObjects.length && <Button onClick={onOk}>Save</Button>}
      </CardFooter>
    </Card>
  );
};
