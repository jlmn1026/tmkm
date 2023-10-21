import { Button, Card } from 'antd';
import { StudyCard } from './constant';
import { CardDate, CardHeader, CardText } from './DisplayCard';
import { format } from 'date-fns';
import { styled } from '@stitches/react';

type Props = {
  card: StudyCard;
  onSelect?: () => void;
  onUnSelect?: () => void;
};

const SelectCard = ({ card, onSelect, onUnSelect }: Props) => {
  return (
    <Card
      style={{ width: '80%' }}
      title={
        <CardHeader>
          <CardDate>{format(new Date(card.createdAt), 'yyyy/MM/dd')}</CardDate>
          <ButtonContainer>
            {onUnSelect && (
              <Button
                onClick={() => {
                  onUnSelect();
                }}
                type="primary"
                danger
              >
                UnSelect
              </Button>
            )}
            {onSelect && (
              <Button
                onClick={() => {
                  onSelect();
                }}
                type="primary"
              >
                Select
              </Button>
            )}
          </ButtonContainer>
        </CardHeader>
      }
      key={card.storeId}
      size="small"
    >
      {card.texts[0]}
      {card.texts.map((item, index) => {
        if (index === 0) {
          return;
        }
        return <CardText key={item}>{item}</CardText>;
      })}
    </Card>
  );
};

export default SelectCard;

const ButtonContainer = styled('div', {
  display: 'flex',
  gap: '12px',
});
