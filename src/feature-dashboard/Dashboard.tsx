'use client';
import { useTranslation } from 'react-i18next';
import { Flex, Typography } from 'antd';

export const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Flex
      vertical
    >
      
      <Typography >
        {t('dashboard.welcome')}
        <br />
      </Typography>
    </Flex>
  );
};
