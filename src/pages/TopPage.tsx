import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import { useState } from 'react';
import { useAsync } from 'react-use';

const TopPage = () => {
  const [favoriteDecks, setFavoriteDecks] = useState<any[]>([]);
  const [recentUsedDecks, setRecentUsedDecks] = useState<any[]>([]);

  useAsync(async () => {
    setFavoriteDecks([]);
    setRecentUsedDecks([]);
  });

  return (
    <CommonContainer>
      <SubTitle>Favorite Decks</SubTitle>
      {favoriteDecks.map((item) => {
        return item;
      })}
      <SubTitle>Recent Used Decks</SubTitle>
      {recentUsedDecks.map((item) => {
        return item;
      })}
    </CommonContainer>
  );
};

export default TopPage;
