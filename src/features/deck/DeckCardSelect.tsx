import SelectCard from '../card/SelectCard';
import { styled } from '@stitches/react';
import { StudyCard } from '../card/constant';
import { AllCards } from '../card/CardSelectForDeck';
import { removeCardFromDeck } from './deckStore';
import { useCardSearch } from '../card/useCardSearch';
import { useEffect } from 'react';
import Search from 'antd/es/input/Search';

type Props = {
  deckId: string;
  deckCards: StudyCard[];
  onUnSelected: () => void;
};

const DeckCardSelect = ({ deckId, deckCards, onUnSelected }: Props) => {
  const [filterdCards, initCards, searchCards] = useCardSearch();

  useEffect(() => {
    initCards(deckCards);
  }, [deckCards, initCards]);

  return (
    <Container>
      <Title>Deck Cards</Title>
      <Search
        onChange={(e) => {
          searchCards(e.target.value);
        }}
      />
      <AllCards>
        {filterdCards.map((card) => {
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
