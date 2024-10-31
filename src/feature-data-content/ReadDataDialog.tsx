import { Dialog, DialogContent, DialogTrigger } from '@/libs/shadCn';
import { AccountHistoryEntryType } from '@/types';
import { NewReadData } from './NewReadData';

type Props = {
  onReady: (p1: AccountHistoryEntryType[]) => void;
};

export const ReadDataDialog = ({ onReady }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        Import new Data
      </DialogTrigger>
      <DialogContent className='min-w-[860px] min-h-[600px]'>
        <NewReadData onReady={onReady} />
      </DialogContent>
    </Dialog>
  );
};
