import CommonContainer from '@/common-ui/CommonContainer';
import HeadlessButton from '@/common-ui/HeadlessButton';
import InputCardText from '@/features/card/InputCardText';
import { addCard } from '@/features/card/cardStore';
import { InputCard } from '@/features/card/constant';
import { PlusCircleOutlined } from '@ant-design/icons';
import { styled } from '@stitches/react';
import { Button, notification } from 'antd';

import { useState } from 'react';
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
  const [inputTexts, setInputTexts] = useState<InputCard[]>(defaultTextCards);

  return (
    <CommonContainer>
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
              addCard(inputTexts, new Date());
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

const Footer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '12px',
});
