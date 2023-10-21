import { format } from 'date-fns';
import { StudyCard } from '../card/constant';
import { Button } from 'antd';
import { useCallback, useState } from 'react';
import { storeCardGoalCount } from '../card/cardStore';
import { styled } from '@stitches/react';

type Props = {
  card: StudyCard;
  deckLength: number;
  cardNumber: number;
  show: boolean;
};

const StudyCardDetail = ({ show, card, cardNumber, deckLength }: Props) => {
  const [goalCount, setGoalCount] = useState<number>(card.goalCount ?? 10);

  const changeGoalCount = useCallback(
    (count: number) => {
      setGoalCount((prev) => {
        storeCardGoalCount(card.storeId, prev + count);
        return prev + count;
      });
    },
    [card.storeId]
  );

  if (!show) {
    return <></>;
  }

  return (
    <CardInfo>
      <div>
        CardNo: {cardNumber}/{deckLength}
      </div>
      <div>Registered Date: {format(new Date(card.createdAt), 'yyyy/MM/dd')}</div>
      <div>UesedCount: {card.usedCount ?? 0}</div>
      <GoalCount>
        GoalCount:{' '}
        <Button
          onClick={() => {
            changeGoalCount(-1);
          }}
        >
          -
        </Button>
        {goalCount}
        <Button
          onClick={() => {
            changeGoalCount(1);
          }}
        >
          +
        </Button>
      </GoalCount>
    </CardInfo>
  );
};

export default StudyCardDetail;

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
  width: '200px',
});
