import { styled } from '@stitches/react';
import { useAsync } from 'react-use';
import { StudyCard } from './constant';
import { useCallback, useEffect, useState } from 'react';
import { getAllCards } from './cardStore';
import SelectCard from './SelectCard';
import { addCardToDeck } from '../deck/deckStore';
import Search from 'antd/es/input/Search';
import { useCardSearch } from './useCardSearch';

type Props = {
  deckId: string;
  onSelected: () => void;
};

const CardSelectForDeck = ({ deckId, onSelected }: Props) => {
  const [filterdCards, initCards, searchCards] = useCardSearch();

  useEffect(() => {
    initCards(getAllCards());
  }, [initCards]);

  return (
    <Container>
      <Title>All Cards</Title>
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
  marginTop: '10px',
  marginBottom: '80px',
  flexWrap: 'wrap',
  height: 'calc(100vh - 230px)',
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
