import { StartLayout } from '@/layouts';
import { FC, PropsWithChildren } from 'react';


const getLayout: FC<PropsWithChildren> = ({ children }) => (
<StartLayout>{children}</StartLayout>
);

export default getLayout;
