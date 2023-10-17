import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import DeckButton from '@/features/deck/DeckButton';
import { styled } from '@stitches/react';
import { useParams } from 'react-router-dom';

const EditDeckPage = () => {
  const urlParams = useParams<{ deckId: string }>();

  console.log(urlParams);

  const cards = [
    {
      storeId: '1',
      name: 'deck1',
    },
    {
      storeId: '2',
      name: 'deck2',
    },
    {
      storeId: '3',
      name: 'deck3',
    },
  ];

  return (
    <CommonContainer>
      <SubTitle>Card List</SubTitle>
      <SubTitle>Input Card</SubTitle>
      <AllCards>
        {cards.map((deck) => {
          return (
            <DeckButton key={deck.storeId} onClick={() => {}}>
              {deck.name}
            </DeckButton>
          );
        })}
      </AllCards>
    </CommonContainer>
  );
};

export default EditDeckPage;

const AllCards = styled('div', {
  display: 'flex',
  gap: '12px',
  marginBottom: '80px',
});
