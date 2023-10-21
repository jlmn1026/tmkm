import { Centerized } from '@/common-ui/Centerized';
import CommonContainer from '@/common-ui/CommonContainer';
import { getCardsByIds, setCardGoalCount, storeCardGoalCount } from '@/features/card/cardStore';
import { StudyCard } from '@/features/card/constant';
import { getDeck } from '@/features/deck/deckStore';
import { styled } from '@stitches/react';
import { Button, notification } from 'antd';
import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';

let timerID: NodeJS.Timeout;

const StudyPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [deckCards, setDeckCards] = useState<StudyCard[]>([]);
  const [initCards, setInitCards] = useState<boolean>(false);
  const [cardDisplayKey, setCardDisplayKey] = useState<number>(0);
  const [textDisplayKey, setTextDisplayKey] = useState<number>(0);
  const [displayGoalCount, setDisplayGoalCount] = useState<number | undefined>();

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

    setDisplayGoalCount(cards[0].goalCount ?? 10);
  }, [deckId]);

  const refreshDisplay = useCallback(
    (cardKey: number) => {
      setDisplayGoalCount(deckCards[cardKey].goalCount ?? 10);
    },
    [deckCards]
  );

  const beforeCard = useCallback(() => {
    if (textDisplayKey === 0) {
      setCardDisplayKey(cardDisplayKey - 1);
      setTextDisplayKey(deckCards[cardDisplayKey - 1].texts.length - 1);
      refreshDisplay(cardDisplayKey - 1);
    } else {
      setTextDisplayKey(textDisplayKey - 1);
    }
  }, [cardDisplayKey, deckCards, refreshDisplay, textDisplayKey]);

  const nextCard = useCallback(() => {
    if (textDisplayKey === deckCards[cardDisplayKey].texts.length - 1) {
      setCardDisplayKey(cardDisplayKey + 1);
      setTextDisplayKey(0);
      refreshDisplay(cardDisplayKey + 1);
    } else {
      setTextDisplayKey(textDisplayKey + 1);
    }
  }, [cardDisplayKey, deckCards, refreshDisplay, textDisplayKey]);

  const changeGoalCount = useCallback(
    (count: number) => {
      setDisplayGoalCount((current) => {
        const updateCount = (current ?? 10) + count;
        storeCardGoalCount(deckCards[cardDisplayKey].storeId, updateCount);
        setDeckCards(
          deckCards.map((item, index) => {
            if (index !== cardDisplayKey) {
              return item;
            }
            return {
              ...item,
              goalCount: updateCount,
            };
          })
        );
        return updateCount;
      });
    },
    [cardDisplayKey, deckCards]
  );

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

  console.log(cardDisplayKey, displayGoalCount);

  const firstCardText = textDisplayKey === 0 && cardDisplayKey === 0;
  const lastCardText =
    textDisplayKey === deckCards[cardDisplayKey].texts.length - 1 &&
    cardDisplayKey === deckCards.length - 1;

  return (
    <CommonContainer>
      <CardInfo>
        <div>
          CardNo: {cardDisplayKey + 1}/{deckCards.length}
        </div>
        <div>
          Registered Date: {format(new Date(deckCards[cardDisplayKey].createdAt), 'yyyy/MM/dd')}
        </div>
        <div>UesedCount: {deckCards[cardDisplayKey].usedCount ?? 0}</div>
        <GoalCount>
          GoalCount:{' '}
          <Button
            onClick={() => {
              changeGoalCount(-1);
            }}
          >
            -
          </Button>
          {displayGoalCount}
          <Button
            onClick={() => {
              changeGoalCount(+1);
            }}
          >
            +
          </Button>
        </GoalCount>
      </CardInfo>
      <StudyCardView>{deckCards[cardDisplayKey].texts[textDisplayKey]}</StudyCardView>
      <ButtonContainer>
        <ButtonGroup>
          <Button type="primary" disabled={firstCardText} onClick={beforeCard}>
            Prev
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

const CardInfo = styled('div', {
  width: '1024px',
  paddingBottom: '4px',
  borderBottom: '1px solid #fff',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

const GoalCount = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});
