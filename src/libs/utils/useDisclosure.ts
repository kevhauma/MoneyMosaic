import { useCallback, useState } from 'react';

export type DisclosureProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

export const useDisclosure = (initialValue = false): DisclosureProps => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const onOpen = useCallback(() => setIsOpen(true), []);

  const onClose = useCallback(() => setIsOpen(false), []);

  const onToggle = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  return { isOpen, onOpen, onClose, onToggle };
};
