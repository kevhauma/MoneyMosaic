import { Col, Row } from 'antd';
import { PropsWithChildren } from 'react';
import { FormFieldLabel } from './FormFieldLabel';

export type FieldLabelProps = { label?: string | null };

export const FieldWithLabel = ({
  label,
  children,
}: PropsWithChildren & FieldLabelProps) => {
  if (label === undefined) return children || null;
  return (
    <Row>
      <FormFieldLabel>{label}</FormFieldLabel>
      <Col flex={1}>{children}</Col>
    </Row>
  );
};
