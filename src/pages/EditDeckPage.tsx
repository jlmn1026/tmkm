import CommonContainer from '@/common-ui/CommonContainer';
import CardSelectForDeck from '@/features/card/CardSelectForDeck';
import { getCardsByIds } from '@/features/card/cardStore';
import { StudyCard } from '@/features/card/constant';
import DeckCardSelect from '@/features/deck/DeckCardSelect';
import { getDeck } from '@/features/deck/deckStore';
import { styled } from '@stitches/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAsyncRetry } from 'react-use';

const EditDeckPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [deckCards, setDeckCards] = useState<StudyCard[]>([]);

  const { loading, retry } = useAsyncRetry(async () => {
    if (!deckId) {
      return;
    }
    const deck = getDeck(deckId);
    const cards = getCardsByIds(deck.cards);
    setDeckCards(cards);
  }, [deckId]);

  if (!deckId || loading) {
    return <>Loading...</>;
  }

  return (
    <CommonContainer>
      <Container>
        <DeckCardSelect
          deckId={deckId}
          deckCards={deckCards}
          onUnSelected={() => {
            retry();
          }}
        />
        <CardSelectForDeck
          deckId={deckId}
          onSelected={() => {
            retry();
          }}
        />
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
