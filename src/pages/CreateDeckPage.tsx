import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import DeckButton from '@/features/deck/DeckButton';
import { addDeck, getAllDecks } from '@/features/deck/deckStore';
import { PageRoute } from '@/routes/pageRoute';
import { Button, Input, notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsyncRetry } from 'react-use';
import { styled } from '@stitches/react';
import { AllDeckContainer } from '@/features/deck/AllDeckContainer';

const CreateDeckPage = () => {
  const navigate = useNavigate();

  const [deckName, setDeckName] = useState<string>();
  const [creating, setCreating] = useState<boolean>(false);
  const {
    retry,
    value: decks,
    loading,
  } = useAsyncRetry(async () => {
    return getAllDecks();
  });

  if (loading || !decks) {
    return <>loading...</>;
  }

  return (
    <CommonContainer>
      <SubTitle>New Deck</SubTitle>
      <CreateDeck>
        <Input
          placeholder="input deck name"
          style={{ width: '850px' }}
          value={deckName}
          onChange={(e) => {
            setDeckName(e.target.value);
          }}
        />
        <Button
          style={{ width: '15%' }}
          loading={creating}
          onClick={() => {
            if (!deckName) {
              notification.error({ message: 'Deck name is empty' });
              return;
            }
            try {
              setCreating(true);
              addDeck(deckName, new Date());
              setDeckName('');
              retry();
            } catch (error) {
              console.error(error);
            } finally {
              setCreating(false);
            }
          }}
        >
          Create Deck
        </Button>
      </CreateDeck>
      <SubTitle>Select Deck</SubTitle>
      <AllDeckContainer>
        {decks.map((deck) => {
          return (
            <DeckButton
              key={deck.storeId}
              onClick={() => {
                navigate(`${PageRoute.EditDeck}/${deck.storeId}`);
              }}
            >
              {deck.name}
            </DeckButton>
          );
        })}
      </AllDeckContainer>
    </CommonContainer>
  );
};

export default CreateDeckPage;

const CreateDeck = styled('div', {
  display: 'flex',
  gap: '12px',
  margin: '12px 0px 36px 0px',
});
