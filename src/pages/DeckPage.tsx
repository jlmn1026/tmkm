import CommonContainer from '@/common-ui/CommonContainer';
import SaveDeckButton from '@/features/deck/SaveDeckButton';
import { StudyDeck } from '@/features/deck/constant';
import { getDeck, updateDeck } from '@/features/deck/deckStore';
import { PageRoute } from '@/routes/pageRoute';
import { styled } from '@stitches/react';
import { Button, Input, notification } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAsync, useAsyncFn } from 'react-use';

const DeckPage = () => {
  const { deckId } = useParams<{ deckId: string }>();

  const [, setDeck] = useState<StudyDeck>();
  const [deckName, setDeckName] = useState<string>('');

  useAsync(async () => {
    if (!deckId) {
      return;
    }
    const deck = getDeck(deckId);
    setDeck(deck);
    setDeckName(deck.name);
  }, [deckId, setDeck, setDeckName]);

  const [changeNameState, changeName] = useAsyncFn(async (deckName: string) => {
    if (!deckId) {
      return;
    }
    updateDeck(deckId, { deckName });
    notification.success({ message: 'Deck name changed' });
  });

  return (
    <CommonContainer>
      <ChangeTitleRow>
        <Input
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          style={{ width: 400 }}
        />
        <Button
          loading={changeNameState.loading}
          onClick={() => {
            changeName(deckName);
          }}
        >
          Change Deck Name
        </Button>
      </ChangeTitleRow>
      {deckId && (
        <ButtonRow>
          <Link to={`${PageRoute.EditDeck}/${deckId}`}>
            <Button>Select Card</Button>
          </Link>
          <SaveDeckButton deckId={deckId} />
        </ButtonRow>
      )}
    </CommonContainer>
  );
};

export default DeckPage;

const ChangeTitleRow = styled('div', {
  display: 'flex',
  margin: '24px 0px',
  gap: '12px',
});

const ButtonRow = styled('div', {
  display: 'flex',
  gap: '24px',
  margin: '48px 0px',
});
