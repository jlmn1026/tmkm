import { Button, Card } from 'antd';
import { format } from 'date-fns';
import { StudyCard } from './constant';
import { styled } from '@/stitches.config';
import { useState } from 'react';

type Props = {
  card: StudyCard;
};

const DisplayCard = ({ card }: Props) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <Card
      title={
        <CardHeader>
          <CardDate>{format(new Date(card.createdAt), 'yyyy/MM/dd')}</CardDate>
          <Button
            type="primary"
            style={{ width: '75px' }}
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {showMore ? 'Hide' : 'More'}
          </Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </CardHeader>
      }
      key={card.storeId}
      size="small"
    >
      {card.texts[0]}
      {showMore &&
        card.texts.map((item, index) => {
          if (index === 0) {
            return;
          }
          return <CardText key={item}>{item}</CardText>;
        })}
    </Card>
  );
};

export default DisplayCard;

const CardHeader = styled('div', {
  display: 'flex',
  gap: '12px',
});

const CardDate = styled('div', {
  display: 'flex',
  alignItems: 'center',
  fontSize: '20px',
  marginRight: '20px',
});

const CardText = styled('div', {
  margin: '6px 0px',
  padding: '6px 0px',
  borderTop: '1px dashed #999',
});
