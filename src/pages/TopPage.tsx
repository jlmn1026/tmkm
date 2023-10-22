import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import { AllDeckContainer } from '@/features/deck/AllDeckContainer';
import DeckButton from '@/features/deck/DeckButton';
import { StudyDeck } from '@/features/deck/constant';
import { getAllDecks, getRecentUsedDeck } from '@/features/deck/deckStore';
import { PageRoute } from '@/routes/pageRoute';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from 'react-use';

const TopPage = () => {
  // const [favoriteDecks, setFavoriteDecks] = useState<StudyDeck[]>([]);
  const [recentUsedDecks, setRecentUsedDecks] = useState<StudyDeck[]>([]);
  const [allDecks, setAllDecks] = useState<StudyDeck[]>([]);

  useAsync(async () => {
    const allDecks = getAllDecks();
    // setFavoriteDecks([]);
    setRecentUsedDecks(getRecentUsedDeck());
    setAllDecks(allDecks);
  });

  return (
    <CommonContainer>
      {/* <SubTitle>Favorite Decks</SubTitle>
      <AllDeckContainer>
        {favoriteDecks.map((deck) => {
          return <DeckButton key={deck.storeId}>{deck.name}</DeckButton>;
        })}
      </AllDeckContainer> */}
      <SubTitle>Recent Used Decks</SubTitle>
      <AllDeckContainer>
        {recentUsedDecks.map((deck) => {
          return <DeckButton key={deck.storeId}>{deck.name}</DeckButton>;
        })}
      </AllDeckContainer>

      <SubTitle>All Decks</SubTitle>
      <AllDeckContainer>
        {allDecks.map((deck) => {
          return (
            <Link key={deck.storeId} to={`${PageRoute.Study}/${deck.storeId}`}>
              <DeckButton>{deck.name}</DeckButton>
            </Link>
          );
        })}
      </AllDeckContainer>
    </CommonContainer>
  );
};

export default TopPage;
