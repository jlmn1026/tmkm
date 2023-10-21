import { Centerized } from '@/common-ui/Centerized';
import CommonContainer from '@/common-ui/CommonContainer';
import { getCardsByIds } from '@/features/card/cardStore';
import { StudyCard } from '@/features/card/constant';
import { getDeck } from '@/features/deck/deckStore';
import { PageRoute } from '@/routes/pageRoute';
import { styled } from '@stitches/react';
import { Button, notification } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';

let messageTimerId: NodeJS.Timeout;

const StudyPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [deckCards, setDeckCards] = useState<StudyCard[]>([]);
  const [initCards, setInitCards] = useState<boolean>(false);
  const [cardDisplayKey, setCardDisplayKey] = useState<number>(0);
  const [textDisplayKey, setTextDisplayKey] = useState<number>(0);

  useAsync(async () => {
    if (!deckId) {
      return;
    }
    const deck = getDeck(deckId);
    const cards = getCardsByIds(deck.cards);
    // randomize
    setDeckCards(cards);
    setInitCards(true);
  }, [deckId]);

  const beforeCard = useCallback(() => {
    if (textDisplayKey === 0) {
      if (cardDisplayKey === 0) {
        clearTimeout(messageTimerId);
        messageTimerId = setTimeout(
          () => notification.info({ message: 'this is first card text!' }),
          200
        );
        return;
      }
      setCardDisplayKey(cardDisplayKey - 1);
      setTextDisplayKey(deckCards[cardDisplayKey - 1].texts.length - 1);

      return;
    }
    setTextDisplayKey(textDisplayKey - 1);
  }, [cardDisplayKey, deckCards, textDisplayKey]);

  const nextCard = useCallback(() => {
    if (textDisplayKey === deckCards[cardDisplayKey].texts.length - 1) {
      if (cardDisplayKey === deckCards.length - 1) {
        clearTimeout(messageTimerId);
        messageTimerId = setTimeout(() => notification.info({ message: 'Finish!' }), 200);
        return;
      }
      setCardDisplayKey(cardDisplayKey + 1);
      setTextDisplayKey(0);

      return;
    }
    setTextDisplayKey(textDisplayKey + 1);
  }, [cardDisplayKey, deckCards, textDisplayKey]);

  if (initCards && deckCards.length === 0) {
    return <Navigate to={`${PageRoute.Top}`} />;
  }

  if (!deckId || deckCards.length === 0) {
    return (
      <CommonContainer>
        <Centerized>Loading...</Centerized>
      </CommonContainer>
    );
  }

  return (
    <CommonContainer>
      <StudyCardView>{deckCards[cardDisplayKey].texts[textDisplayKey]}</StudyCardView>
      <ButtonContainer>
        <ButtonGroup>
          <Button onClick={beforeCard}>Prev</Button>
          <Button onClick={nextCard}>Next</Button>
        </ButtonGroup>
      </ButtonContainer>
    </CommonContainer>
  );
};

export default StudyPage;

const StudyCardView = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 250px)',
  width: '100%',
  fontSize: '48px',
  fontWeight: 'bold',
});

const ButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
});

const ButtonGroup = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '600px',
});
