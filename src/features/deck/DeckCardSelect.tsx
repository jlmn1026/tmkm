import { useAsync } from 'react-use';
import { getAllCards } from '../card/cardStore';
import { useState } from 'react';
import SelectCard from '../card/SelectCard';
import { styled } from '@stitches/react';
import { StudyCard } from '../card/constant';
import { AllCards } from '../card/CardSelectForDeck';

type Props = {
  deckId: string;
};

const DeckCardSelect = ({ deckId }: Props) => {
  const [cards, setCards] = useState<StudyCard[]>([]);
  useAsync(async () => {
    setCards(getAllCards());
  });
  return (
    <Container>
      <Title>Deck Cards</Title>
      <AllCards>
        {cards.map((card) => {
          return <SelectCard key={card.storeId} card={card} onSelect={() => {}} />;
        })}
      </AllCards>
    </Container>
  );
};

export default DeckCardSelect;

const Title = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '12px',
});

const Container = styled('div', {
  width: '45%',

  display: 'flex',
  flexDirection: 'column',
});
