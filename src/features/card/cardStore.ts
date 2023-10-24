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

  return maxNum;
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

export const getCardsByIds = (cardIds: string[]): StudyCard[] => {
  const cards = [];
  for (const cardId of cardIds) {
    const card = getStorage(`${storageKeys.card}${cardId}`);
    if (!card) continue;

    cards.push(JSON.parse(card));
  }

  return cards;
};

export const storeCardGoalCount = (cardId: string, goalCount: number) => {
  const card = getStorage(`${storageKeys.card}${cardId}`);
  if (!card) {
    notification.error({
      message: 'Card not found',
    });
    throw new Error('Card not found');
  }

  setStorage(`${storageKeys.card}${cardId}`, {
    ...JSON.parse(card),
    goalCount,
  });
};

export const finishStudyCards = (cardIds: string[]) => {
  cardIds.forEach((cardId) => {
    const card = getStorage(`${storageKeys.card}${cardId}`);
    if (!card) {
      notification.error({
        message: 'Card not found',
      });
      throw new Error('Card not found');
    }

    const cardObj = JSON.parse(card) as StudyCard;

    cardObj.usedCount = (cardObj.usedCount ?? 0) + 1;

    setStorage(`${storageKeys.card}${cardId}`, cardObj);
  });
};
