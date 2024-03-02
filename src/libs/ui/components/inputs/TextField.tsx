
import {Input,InputProps} from 'antd'



export const TextField = ({
  ...props
}: InputProps) => {
  return (
        <Input          
          {...props}
          value={props.value || ''}
        />
        
  );
};
