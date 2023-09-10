import CommonContainer from '@/common-ui/CommonContainer';
import HeadlessButton from '@/common-ui/HeadlessButton';
import InputCardText from '@/features/create-card/InputCardText';
import { InputCard } from '@/features/create-card/constant';
import { styled } from '@/stitches.config';
import { PlusCircleOutlined } from '@ant-design/icons';

import { useState } from 'react';
let inputTimeId: NodeJS.Timeout;

const CreateCardPage = () => {
  const [inputTexts, setInputTexts] = useState<InputCard[]>([
    {
      id: crypto.randomUUID(),
      text: '',
    },
    {
      id: crypto.randomUUID(),
      text: '',
    },
  ]);

  return (
    <CommonContainer>
      {inputTexts.map((inputText, index) => {
        return (
          <InputCardText
            key={inputText.id}
            cardnum={index + 1}
            onDelete={() => {
              setInputTexts(inputTexts.filter((item, index2) => index2 !== index));
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
    </CommonContainer>
  );
};

export default CreateCardPage;
