import { Centerized } from '@/common-ui/Centerized';
import CommonContainer from '@/common-ui/CommonContainer';
import { finishStudyCards, getCardsByIds } from '@/features/card/cardStore';
import { StudyCard } from '@/features/card/constant';
import { getDeck, updateRecentUsedDeck } from '@/features/deck/deckStore';
import StudyCardDetail from '@/features/study/StudyCardDetail';
import { styled } from '@stitches/react';
import { Button, notification } from 'antd';
import { useCallback, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';

let timerID: NodeJS.Timeout;

const StudyPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  const [deckCards, setDeckCards] = useState<StudyCard[]>([]);
  const [initCards, setInitCards] = useState<boolean>(false);
  const [cardDisplayKey, setCardDisplayKey] = useState<number>(0);
  const [textDisplayKey, setTextDisplayKey] = useState<number>(0);

  const [finishLoading, setFinishLoading] = useState<boolean>(false);

  useAsync(async () => {
    if (!deckId) {
      return;
    }
    const deck = getDeck(deckId);
    const cards = getCardsByIds(deck.cards).sort(() => Math.random() - 0.5);
    // randomize
    setDeckCards(cards);
    setInitCards(true);

    if (cards.length === 0) {
      clearTimeout(timerID);
      timerID = setTimeout(() => notification.error({ message: 'Deck is empty' }), 200);
    }
  }, [deckId]);

  const beforeCard = useCallback(() => {
    if (textDisplayKey === 0) {
      setCardDisplayKey(cardDisplayKey - 1);
      setTextDisplayKey(deckCards[cardDisplayKey - 1].texts.length - 1);
    } else {
      setTextDisplayKey(textDisplayKey - 1);
    }
  }, [cardDisplayKey, deckCards, textDisplayKey]);

  const nextCard = useCallback(() => {
    if (textDisplayKey === deckCards[cardDisplayKey].texts.length - 1) {
      setCardDisplayKey(cardDisplayKey + 1);
      setTextDisplayKey(0);
    } else {
      setTextDisplayKey(textDisplayKey + 1);
    }
  }, [cardDisplayKey, deckCards, textDisplayKey]);

  const finishStudy = useCallback(() => {
    if (!deckId) {
      return;
    }
    setFinishLoading(true);
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      try {
        finishStudyCards(deckCards.map((card) => card.storeId));
        updateRecentUsedDeck(deckId);
        notification.success({ message: 'Study Finished' });
        navigate('/');
      } catch (error) {
        console.log(error);
      } finally {
        setFinishLoading(false);
      }
    }, 400);
  }, [deckCards, deckId, navigate]);

  if (initCards && deckCards.length === 0) {
    return <Navigate to="/" />;
  }

  if (!deckId || deckCards.length === 0) {
    return (
      <CommonContainer>
        <Centerized>Loading...</Centerized>
      </CommonContainer>
    );
  }

  const firstCardText = textDisplayKey === 0 && cardDisplayKey === 0;
  const lastCardText =
    textDisplayKey === deckCards[cardDisplayKey].texts.length - 1 &&
    cardDisplayKey === deckCards.length - 1;

  return (
    <CommonContainer>
      {deckCards.map((card, index) => {
        return (
          <>
            <StudyCardDetail
              card={card}
              show={index === cardDisplayKey}
              deckLength={deckCards.length}
              cardNumber={cardDisplayKey + 1}
            />
            {finishLoading && <Centerized>Loading...</Centerized>}
            {!finishLoading && index === cardDisplayKey && (
              <StudyCardView key={card.storeId}>
                {card.texts.map((text, index) => {
                  if (index !== textDisplayKey) {
                    return <></>;
                  }
                  return text;
                })}
              </StudyCardView>
            )}
          </>
        );
      })}
      <ButtonContainer>
        <ButtonGroup>
          <Button type="primary" disabled={firstCardText} onClick={beforeCard}>
            Prev
          </Button>
          <Button type="primary" onClick={finishStudy}>
            Finish
          </Button>
          <Button type="primary" disabled={lastCardText} onClick={nextCard}>
            Next
          </Button>
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
  width: '1024px',
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
