import { styled } from '@stitches/react';
import { Button, Input, Row } from 'antd';

type Props = React.ButtonHTMLAttributes<HTMLInputElement> & {
  cardNum: number;
  handleDelete: () => void;
};

const InputCardText = (props: Props) => {
  const { cardNum, handleDelete, ...rest } = props;

  return (
    <>
      <InputHeader>
        <InputLabel>Input Text {cardNum}</InputLabel>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
      </InputHeader>

      <Input {...rest} />
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
