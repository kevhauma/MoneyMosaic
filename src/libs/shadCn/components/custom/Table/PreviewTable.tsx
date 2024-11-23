import {
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui';
import { safeFieldAccess } from './TableUtils';

type TableConfigEntry<T> = {
  field: keyof T;
  headerName?: string;
  width?: number;
  render?: (p1: T) => JSX.Element;
};

export type TableConfig<T extends object> = Array<TableConfigEntry<T>>;

type PreviewTableProps<T extends object> = {
  rows: Array<T>;
  columns: TableConfig<T>;
};

export const PreviewTable = <T extends object>({
  columns,
  rows,
}: PreviewTableProps<T>) => {
  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(({ headerName, field }) => (
              <TableHead
                key={`table-header-${String(field)}`}
                className="w-[100px]"
              >
                {headerName || String(field)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((rowData, i) => (
            <TableRow key={`table-row-${i}`}>
              {columns.map(({ width, render, field }) => (
                <TableCell
                  key={`table-row-${i}-cell-${String(field)}`}
                  style={{ width: `${width || 100}px` }}
                >
                  <ScrollArea
                    style={{ width: `${width || 100}px` }}
                    className="h-[25px]"
                  >
                    {render?.(rowData) ||
                      safeFieldAccess(rowData, field) ||
                      '-'}
                  </ScrollArea>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
