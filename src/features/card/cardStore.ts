import { getStorage, setStorage, storageKeys } from '@/storage/localStorage';
import { InputCard, StudyCard } from './constant';
import { notification } from 'antd';

export const resetCard = () => {
  setStorage(storageKeys.cardMax, '1', false);
};

export const addCard = (cards: InputCard[], createdAt: Date) => {
  const valdation = cards.filter((card) => {
    if (card.text.replace(/\s/g, '').length === 0) {
      return true;
    }
    return false;
  });
  if (valdation.length > 0) {
    notification.error({
      message: 'Some text has not been entered',
    });
    throw new Error('Some text has not been entered');
  }

  const maxNum: number = Number(getStorage(storageKeys.cardMax) ?? 0);

  if (maxNum === 0) {
    resetCard();
  }

  setStorage(`${storageKeys.card}${maxNum}`, {
    storeId: maxNum,
    texts: cards.map((card) => card.text),
    createdAt,
  });
  setStorage(`${storageKeys.cardMax}`, maxNum + 1);
};

export const getAllCards = (offset = 0, limit = 50): StudyCard[] => {
  const maxNum: number = Number(getStorage(storageKeys.cardMax) ?? 0);
  const lastIndex = maxNum - offset;
  const results = [];
  for (let i = lastIndex; i >= lastIndex - limit; i--) {
    if (i < 0) break;

    const card = getStorage(`${storageKeys.card}${i}`);
    if (!card) continue;

    results.push(JSON.parse(card));
  }

  return results;
};
