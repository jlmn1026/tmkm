import { styled } from '@stitches/react';
import { useAsync } from 'react-use';
import { StudyCard } from './constant';
import { useState } from 'react';
import { getAllCards } from './cardStore';
import SelectCard from './SelectCard';
import { addCardToDeck } from '../deck/deckStore';

type Props = {
  deckId: string;
  onSelected: () => void;
};

const CardSelectForDeck = ({ deckId, onSelected }: Props) => {
  const [cards, setCards] = useState<StudyCard[]>([]);
  useAsync(async () => {
    setCards(getAllCards());
  });

  return (
    <Container>
      <Title>All Cards</Title>
      <AllCards>
        {cards.map((card) => {
          return (
            <SelectCard
              key={card.storeId}
              card={card}
              onSelect={() => {
                addCardToDeck(deckId, card.storeId);
                onSelected();
              }}
            />
          );
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
  height: 'calc(100vh - 200px)',
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
