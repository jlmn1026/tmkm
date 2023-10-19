import CommonContainer from '@/common-ui/CommonContainer';
import CardSelectForDeck from '@/features/card/CardSelectForDeck';
import DeckCardSelect from '@/features/deck/DeckCardSelect';
import { styled } from '@stitches/react';
import { useParams } from 'react-router-dom';

const EditDeckPage = () => {
  const { deckId } = useParams<{ deckId: string }>();

  if (!deckId) {
    return <></>;
  }

  return (
    <CommonContainer>
      <Container>
        <DeckCardSelect deckId={deckId} />
        <CardSelectForDeck deckId={deckId} />
      </Container>
    </CommonContainer>
  );
};

export default EditDeckPage;

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
});
