import { styled } from '@stitches/react';
import { useAsync } from 'react-use';
import { StudyCard } from './constant';
import { useState } from 'react';
import { getAllCards } from './cardStore';
import SelectCard from './SelectCard';

type Props = {
  deckId: string;
};

const CardSelectForDeck = ({ deckId }: Props) => {
  const [cards, setCards] = useState<StudyCard[]>([]);
  useAsync(async () => {
    setCards(getAllCards());
  });

  return (
    <Container>
      <Title>All Cards</Title>
      <AllCards>
        {cards.map((card) => {
          return <SelectCard key={card.storeId} card={card} onSelect={() => {}} />;
        })}
      </AllCards>
    </Container>
  );
};

export default CardSelectForDeck;

export const AllCards = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  marginBottom: '80px',
  flexWrap: 'wrap',
  height: 'calc(100vh - 120px)',
  overflowY: 'scroll',
});

const Title = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '12px',
});

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '45%',
});
