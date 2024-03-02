import { Col, Typography } from 'antd';
import { PropsWithChildren } from 'react';

export const FormFieldLabel = ({ children }: PropsWithChildren) => (
  <Col span={3}>
    <Typography>{children}</Typography>
  </Col>
);
