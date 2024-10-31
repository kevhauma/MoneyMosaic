'use client';
import { Flex } from '@/libs/shadCn';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Flex>
      <span>
        {t('dashboard.welcome')}
        <br />
      </span>
    </Flex>
  );
};
