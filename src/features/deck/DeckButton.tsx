import { Button } from 'antd';
import { ReactNode } from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const DeckButton = ({ children, ...props }: Props) => {
  return (
    <Button
      onClick={props.onClick}
      style={{
        width: '240px',
        overflow: 'hidden',
      }}
    >
      {children}
    </Button>
  );
};

export default DeckButton;
