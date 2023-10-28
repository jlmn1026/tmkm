import { getStorage, setStorage, storageKeys } from '@/storage/localStorage';
import { InputCard, StudyCard } from './constant';
import { notification } from 'antd';

export const resetCard = () => {
  setStorage(storageKeys.cardMax, '1', false);
};

const validCardText = (cards: InputCard[]) => {
  cards.filter((card) => {
    if (card.text.replace(/\s/g, '').length === 0) {
      notification.error({
        message: 'Some text has not been entered',
      });
      throw new Error('Some text has not been entered');
    }
  });
};

export const addCard = (cards: InputCard[], createdAt: Date) => {
  validCardText(cards);

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

// Consider duplicates
export const addCardFromJSON = (cards: StudyCard[], createdAt: Date): string[] => {
  let maxNum: number = Number(getStorage(storageKeys.cardMax) ?? 0);

  if (maxNum === 0) {
    resetCard();
  }

  const allCards = getAllCards();

  const storeIds = cards.map((card) => {
    const existCard = allCards.find(
      (c) => c.texts[0] === card.texts[0] && JSON.stringify(c.texts) === JSON.stringify(card.texts)
    );

    if (!existCard) {
      setStorage(`${storageKeys.card}${maxNum}`, {
        storeId: maxNum,
        texts: card.texts,
        createdAt,
      });
      return `${maxNum++}`;
    }

    return existCard.storeId;
  });

  return storeIds;
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
