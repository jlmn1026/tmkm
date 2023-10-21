import SelectCard from '../card/SelectCard';
import { styled } from '@stitches/react';
import { StudyCard } from '../card/constant';
import { AllCards } from '../card/CardSelectForDeck';
import { removeCardFromDeck } from './deckStore';

type Props = {
  deckId: string;
  deckCards: StudyCard[];
  onUnSelected: () => void;
};

const DeckCardSelect = ({ deckId, deckCards, onUnSelected }: Props) => {
  return (
    <Container>
      <Title>Deck Cards</Title>
      <AllCards>
        {deckCards.map((card) => {
          return (
            <SelectCard
              key={card.storeId}
              card={card}
              onUnSelect={() => {
                removeCardFromDeck(deckId, card.storeId);
                onUnSelected();
              }}
            />
          );
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
