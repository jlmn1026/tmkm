import CommonContainer from '@/common-ui/CommonContainer';
import { Tab, Tabs } from '@/common-ui/Tab';
import CardSelect from '@/features/card/CardSelect';
import DeckCardSelect from '@/features/deck/DeckCardSelect';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type TabPage = 'card-select' | 'deck-cards';

const EditDeckPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [tabPage, setTabPage] = useState<TabPage>('deck-cards');

  if (!deckId) {
    return <></>;
  }

  return (
    <CommonContainer>
      <Tabs>
        <Tab selected={tabPage === 'deck-cards'} onClick={() => setTabPage('deck-cards')}>
          Deck Cards
        </Tab>
        <Tab selected={tabPage === 'card-select'} onClick={() => setTabPage('card-select')}>
          Card Select
        </Tab>
      </Tabs>
      {tabPage === 'deck-cards' && <DeckCardSelect deckId={deckId} />}
      {tabPage === 'card-select' && <CardSelect deckId={deckId} />}
    </CommonContainer>
  );
};

export default EditDeckPage;
