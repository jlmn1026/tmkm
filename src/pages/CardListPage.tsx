import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import { StudyCard } from '@/features/create-card/constant';
import { useState } from 'react';
import { useAsync } from 'react-use';

const CardListPage = () => {
  const [cardCards, setCards] = useState<StudyCard[]>([]);
  useAsync(async () => {
    setCards([]);
  });

  return (
    <CommonContainer>
      <SubTitle>CardList</SubTitle>
      {cardCards.map((card) => {
        return <>{card.texts[0]}</>;
      })}
    </CommonContainer>
  );
};

export default CardListPage;
