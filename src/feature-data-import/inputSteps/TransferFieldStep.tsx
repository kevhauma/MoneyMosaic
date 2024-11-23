import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Input,
  ScrollArea,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SimpleSelect,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/libs/shadCn';

import { CsvData } from '@/libs/utils';
import { Select } from '@radix-ui/react-select';
import { useState } from 'react';
import { UseStateReturnType } from '@/types';

type Props = {
  legendValue: Array<string>;
  csvData: Array<CsvData>;
  accountFieldState: UseStateReturnType<string>;
  accountNameState: UseStateReturnType<string>;
  recipientFieldState: UseStateReturnType<string>;
  recipientNameState: UseStateReturnType<string>;
  descriptionFieldState: UseStateReturnType<string>;
};

export const TransferFieldStep = ({
  legendValue,
  csvData,
  accountFieldState,
  accountNameState,
  recipientFieldState,
  recipientNameState,
  descriptionFieldState,
}: Props) => {
  const [accountField, setAccountField] = accountFieldState;
  const [accountName, setAccountNameField] = accountNameState;
  const [recipientField, setRecipientField] = recipientFieldState;
  const [recipientName, setRecipientName] = recipientNameState;
  const [descriptionField, setDescriptionField] = descriptionFieldState;

  const [localAccountField, setLocalAccountField] = useState(
    accountField || 'Rekeningnummer'
  );
  const [localAccountName, setLocalAccountName] = useState(
    accountName || 'Naam'
  );
  const [localRecipientField, setLocalRecipientField] = useState(
    recipientField || 'rekeningnummer tegenpartij'
  );
  const [localRecipientName, setLocalRecipientName] = useState(
    recipientName || 'naam tegenpartij'
  );
  const [localDescriptionField, setLocalDescriptionField] = useState(
    descriptionField || 'Vrije mededeling'
  );

  const onOk = () => {
    setAccountField(localAccountField);
    setAccountNameField(localAccountName);
    setRecipientField(localRecipientField);
    setRecipientName(localRecipientName);
    setDescriptionField(localDescriptionField);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Configure Transfer Fields</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Flex vertical className="gap-4 py-2">
          <Flex>
            <SimpleSelect
              label="Account Field"
              value={localAccountField}
              onChange={setLocalAccountField}
              options={legendValue}
            />
            <SimpleSelect
              label="Account Name"
              value={localAccountName}
              onChange={setLocalAccountName}
              options={legendValue}
            />
          </Flex>
          <Flex>
            <SimpleSelect
              label="Recipient Account"
              value={localRecipientField}
              onChange={setLocalRecipientField}
              options={legendValue}
            />
            <SimpleSelect
              label="Recipient Name"
              value={localRecipientName}
              onChange={setLocalRecipientName}
              options={legendValue}
            />
          </Flex>
          <SimpleSelect
            label="Transfer Description Field"
            value={localDescriptionField}
            onChange={setLocalDescriptionField}
            options={legendValue}
          />
        </Flex>
        {(csvData.length || undefined) && (
          <>
            preview:
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Account</TableHead>
                    <TableHead className="w-[100px]">Account Name</TableHead>
                    <TableHead className="w-[100px]">
                      Recipient Account
                    </TableHead>
                    <TableHead className="w-[100px]">Recipient Name</TableHead>
                    <TableHead className="flex-grow">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.slice(0, 10).map((csvObject, i) => (
                    <TableRow key={`table-row-${i}`}>
                      <TableCell className="w-[100px]">
                        <ScrollArea className="h-[25px] w-[100px]">
                          {csvObject[localAccountField] || '-'}
                        </ScrollArea>
                      </TableCell>
                      <TableCell className="w-[200px]">
                        <ScrollArea className="h-[25px] w-[200px]">
                          {csvObject[localRecipientField] || '-'}
                        </ScrollArea>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onOk}>Save</Button>
      </CardFooter>
    </Card>
  );
};
