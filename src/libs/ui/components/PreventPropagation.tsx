import { MouseEventHandler, PropsWithChildren } from 'react';
const preventPropagation: MouseEventHandler = (e) => {
  // Clicking the checkbox should not trigger cell selection
  // This will keep the selection selected
  e.preventDefault();
  e.stopPropagation();
};

export const PreventPropagation = ({ children }: PropsWithChildren) => {
  return <span onClick={preventPropagation}>{children}</span>;
};
