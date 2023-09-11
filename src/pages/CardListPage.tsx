import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import DisplayCard from '@/features/card/DisplayCard';
import { getAllCards } from '@/features/card/cardStore';
import { StudyCard } from '@/features/card/constant';
import { styled } from '@/stitches.config';

import { useState } from 'react';
import { useAsync } from 'react-use';

const CardListPage = () => {
  const [cardCards, setCards] = useState<StudyCard[]>([]);
  useAsync(async () => {
    setCards(getAllCards());
  });

  return (
    <CommonContainer>
      <SubTitle>CardList</SubTitle>
      <CardList>
        {cardCards.map((card) => {
          return <DisplayCard key={card.storeId} card={card} />;
        })}
      </CardList>
    </CommonContainer>
  );
};

export default CardListPage;

const CardList = styled('div', {
  padding: '4px',
  marginTop: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});
