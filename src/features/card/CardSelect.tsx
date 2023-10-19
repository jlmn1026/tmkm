import { styled } from '@stitches/react';

type Props = {
  deckId: string;
};

const CardSelect = ({ deckId }: Props) => {
  return <>card select</>;
};

export default CardSelect;

const AllCards = styled('div', {
  display: 'flex',
  gap: '12px',
  marginBottom: '80px',
});
