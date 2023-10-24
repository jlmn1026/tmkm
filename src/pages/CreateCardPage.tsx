import CommonContainer from '@/common-ui/CommonContainer';
import HeadlessButton from '@/common-ui/HeadlessButton';
import InputCardText from '@/features/card/InputCardText';
import { addCard } from '@/features/card/cardStore';
import { InputCard } from '@/features/card/constant';
import { StudyDeck } from '@/features/deck/constant';
import { addCardToDeck, getAllDecks } from '@/features/deck/deckStore';
import { PlusCircleOutlined } from '@ant-design/icons';
import { styled } from '@stitches/react';
import { Button, Select, notification } from 'antd';

import { useState } from 'react';
import { useAsync } from 'react-use';
let inputTimeId: NodeJS.Timeout;

const defaultTextCards = [
  {
    id: crypto.randomUUID(),
    text: '',
  },
  {
    id: crypto.randomUUID(),
    text: '',
  },
];

const CreateCardPage = () => {
  const [deckId, setDeckId] = useState<string | undefined>();
  const [inputTexts, setInputTexts] = useState<InputCard[]>(defaultTextCards);
  const [allDeck, setAllDeck] = useState<StudyDeck[]>([]);
  useAsync(async () => {
    setAllDeck(getAllDecks());
  });

  return (
    <CommonContainer>
      <SelectDeckRow>
        <Select
          placeholder="Select Deck"
          style={{ width: 360 }}
          onChange={(value) => {
            setDeckId(value);
          }}
          options={allDeck.map((deck) => {
            return {
              value: deck.storeId,
              label: deck.name,
            };
          })}
        />
      </SelectDeckRow>

      {inputTexts.map((inputText, index) => {
        return (
          <InputCardText
            key={inputText.id}
            cardNum={index + 1}
            handleDelete={() => {
              setInputTexts(inputTexts.filter((_item, index2) => index2 !== index));
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              clearTimeout(inputTimeId);
              inputTimeId = setTimeout(() => {
                inputTexts[index].text = e.target.value;
                setInputTexts([...inputTexts]);
              }, 500);
            }}
          />
        );
      })}
      <Footer>
        {inputTexts.length < 10 && (
          <HeadlessButton
            onClick={() => {
              setInputTexts([
                ...inputTexts,
                {
                  id: crypto.randomUUID(),
                  text: '',
                },
              ]);
            }}
          >
            <PlusCircleOutlined style={{ fontSize: '24px', color: '#fff', marginTop: '8px' }} />
          </HeadlessButton>
        )}

        <Button
          style={{
            marginTop: '48px',
          }}
          onClick={() => {
            try {
              const cardId = addCard(inputTexts, new Date());
              if (deckId) {
                addCardToDeck(deckId, `${cardId}`);
              }

              notification.success({
                message: 'new Card created!',
              });
              setInputTexts([
                {
                  id: crypto.randomUUID(),
                  text: '',
                },
                {
                  id: crypto.randomUUID(),
                  text: '',
                },
              ]);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Create
        </Button>
      </Footer>
    </CommonContainer>
  );
};

export default CreateCardPage;

const SelectDeckRow = styled('div', {
  marginBottom: '24px',
});

const Footer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '12px',
});
