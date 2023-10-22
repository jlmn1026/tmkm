import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import { StudyDeck } from '@/features/deck/constant';
import { getDeck } from '@/features/deck/deckStore';
import { styled } from '@stitches/react';
import { Button } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from 'react-use';

const BeforeStudyPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [deck, setDeck] = useState<StudyDeck>();

  useAsync(async () => {
    if (!deckId) {
      return;
    }
    setDeck(getDeck(deckId));
  });

  if (!deck) {
    return <>Loading...</>;
  }

  return (
    <CommonContainer>
      <SubTitle>Select the type of card for your study</SubTitle>
      <SelectNumberRow>
        <Button type="primary">All Card</Button>
        <Button type="primary">Used infrequently</Button>
        <Button type="primary">Below goal count</Button>
      </SelectNumberRow>
      <SubTitle>Select use Number of cards</SubTitle>
      <SelectNumberRow>
        <Button type="primary">10</Button>
        <Button type="default">20</Button>
        <Button type="primary">30</Button>
        <Button type="primary">40</Button>
        <Button type="primary">50</Button>
      </SelectNumberRow>
    </CommonContainer>
  );
};

export default BeforeStudyPage;

const SelectNumberRow = styled('div', {
  display: 'flex',
  gap: '12px',
  margin: '24px 0px',
});
