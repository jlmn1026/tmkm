import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import DisplayCard from '@/features/card/DisplayCard';
import { addCardFromJSON } from '@/features/card/cardStore';
import { StudyCard } from '@/features/card/constant';
import { StudyDeck } from '@/features/deck/constant';
import { addDeckFromJSON } from '@/features/deck/deckStore';
import { PageRoute } from '@/routes/pageRoute';
import { styled } from '@stitches/react';
import { Button, Upload, message, notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;

const InputFromJSONPage = () => {
  const navigate = useNavigate();
  const [loadDeck, setLoadDeck] = useState<StudyDeck>();
  const [loadCards, setLoadCards] = useState<StudyCard[]>([]);
  return (
    <CommonContainer>
      <SubTitle>Input Deck From JSON</SubTitle>
      <DraggerArea>
        <Dragger
          name="file"
          multiple={false}
          accept=".json"
          customRequest={(e) => {
            console.log('before upload', e);
          }}
          style={{
            color: '#fff',
          }}
          onChange={(info) => {
            const reader = new FileReader();

            reader.readAsText(info.file.originFileObj as Blob);
            reader.addEventListener('load', function () {
              const loadObj = JSON.parse(reader.result as string);

              if (!loadObj.deck || !loadObj.cards) {
                message.error('File format error');
              }
              setLoadDeck(loadObj.deck);
              setLoadCards(loadObj.cards);
            });
          }}
        >
          <DandDText>Click or drag json file to this area to upload</DandDText>
        </Dragger>
      </DraggerArea>
      {loadDeck && (
        <LoadedDeckRow>
          <div>Deck Name: {loadDeck?.name}</div>
          <Button
            onClick={() => {
              const cardIDs = addCardFromJSON(loadCards, new Date());
              addDeckFromJSON(loadDeck?.name, cardIDs, new Date());
              notification.success({ message: 'Deck & Card saved' });
              navigate(PageRoute.CreateDeck);
            }}
          >
            Save This Deck & Card
          </Button>
        </LoadedDeckRow>
      )}
      <LoadedCards>
        {loadCards.map((card) => {
          return <DisplayCard card={card} key={card.storeId} />;
        })}
      </LoadedCards>
    </CommonContainer>
  );
};

export default InputFromJSONPage;

const DraggerArea = styled('div', {
  margin: '24px 0px',
  height: '200px',
  color: '#fff',

  '.ant-upload-list-item-name': {
    display: 'none',
  },
  '.ant-upload-list-item-name::before': {
    content: 'Load File Name: ',
  },
});

const DandDText = styled('p', {
  color: '#fff',
  fontSize: '24px',
});

const LoadedDeckRow = styled('div', {
  margin: '48px 0px 0px 0px',
  color: '#fff',
  fontSize: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const LoadedCards = styled('div', {
  margin: '32px 0px',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});
