import { Button, ButtonProps } from 'antd';
import { useTranslation } from 'react-i18next';

type Props = ButtonProps & {
  onOpen: (p1: string[]) => void;
  fileTypes: Array<string>;
};

export const OpenFilesButton = ({
  onOpen,
  fileTypes,
  ...buttonProps
}: Props) => {
  const { t } = useTranslation();

  const onClick = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = fileTypes.join(',');
    inputElement.multiple = true;
    inputElement.addEventListener('change', async (event) => {
      const fileReadPromises = Array.from(inputElement.files || []).map(
        (file) => file.text()
      );
      const texts = await Promise.all(fileReadPromises);
      onOpen(texts);
    });

    inputElement.click();
  };

  return (
    <Button onClick={onClick} {...buttonProps}>
      {t('form.open')}
    </Button>
  );
};
