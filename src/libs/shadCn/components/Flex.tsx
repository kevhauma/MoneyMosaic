import { PropsWithChildren } from 'react';

type Props = PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement> & {
    vertical?: boolean;
    className?: string;
  };

export const Flex = ({ children, vertical, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={`flex ${vertical ? 'flex-col' : 'flex-row'} ${className}`}
    >
      {children}
    </div>
  );
};
