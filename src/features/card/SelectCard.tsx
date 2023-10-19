import { Button, Card } from 'antd';
import { StudyCard } from './constant';
import { CardDate, CardHeader, CardText } from './DisplayCard';
import { format } from 'date-fns';

type Props = {
  card: StudyCard;
  onSelect: (card: StudyCard) => void;
};

const SelectCard = ({ card }: Props) => {
  return (
    <Card
      style={{ width: '80%' }}
      title={
        <CardHeader>
          <CardDate>{format(new Date(card.createdAt), 'yyyy/MM/dd')}</CardDate>
          <Button onClick={() => {}} type="primary">
            Select
          </Button>
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
