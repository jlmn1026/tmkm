import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import DisplayCard from '@/features/card/DisplayCard';
import { getAllCards } from '@/features/card/cardStore';
import { useCardSearch } from '@/features/card/useCardSearch';
import { styled } from '@/stitches.config';
import Search from 'antd/es/input/Search';

import { useAsync } from 'react-use';

const CardListPage = () => {
  const [filterdCards, initCards, searchCards] = useCardSearch();

  useAsync(async () => {
    initCards(getAllCards());
  });

  return (
    <CommonContainer>
      <SubTitle>CardList</SubTitle>
      <Search
        onChange={(e) => {
          searchCards(e.target.value);
        }}
      />
      <CardList>
        {filterdCards.map((card) => {
          return <DisplayCard key={card.storeId} card={card} />;
        })}
      </CardList>
    </CommonContainer>
  );
};

export default CardListPage;

const CardList = styled('div', {
  padding: '4px',
  marginTop: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});
