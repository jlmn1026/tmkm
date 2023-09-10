import { styled } from '@stitches/react';
import { Button, Input, Row } from 'antd';

type Props = React.ButtonHTMLAttributes<HTMLInputElement> & {
  cardnum: number;
  onDelete: () => void;
};

const InputCardText = (props: Props) => {
  return (
    <>
      <InputHeader>
        <InputLabel>Input Text {props.cardnum}</InputLabel>
        <Button size="small" onClick={props.onDelete}>
          Delete
        </Button>
      </InputHeader>

      <Input {...props} />
    </>
  );
};

export default InputCardText;

const InputLabel = styled(Row, {
  fontSize: '25px',
  margin: '8px 0px 8px 0px',
  width: '160px',
});

const InputHeader = styled(Row, {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});
