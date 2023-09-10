import { getStorage, setStorage, storageKeys } from '@/storage/localStorage';
import { InputCard } from './constant';
import { notification } from 'antd';

export const resetCard = () => {
  setStorage(storageKeys.cardMax, '1', false);
};

export const addCard = (cards: InputCard[]) => {
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

  setStorage(`${storageKeys.card}${maxNum}`, cards);
  setStorage(`${storageKeys.cardMax}`, maxNum + 1);
};
