import { getStorage, setStorage, storageKeys } from '@/storage/localStorage';
import { StudyDeck } from './constant';
import { notification } from 'antd';

export const resetCard = () => {
  setStorage(storageKeys.deckMax, '1', false);
};

export const addDeck = (deckName: string, createdAt: Date) => {
  if (!deckName) {
    notification.error({
      message: 'please input deck name',
    });
    throw new Error('No deck name');
  }

  const maxNum: number = Number(getStorage(storageKeys.deckMax) ?? 0);

  if (maxNum === 0) {
    resetCard();
  }

  setStorage(`${storageKeys.deck}${maxNum}`, {
    storeId: maxNum,
    name: deckName,
    cards: [],
    createdAt,
  });
  setStorage(`${storageKeys.deckMax}`, maxNum + 1, false);
};

export const getAllDecks = (offset = 0, limit = 50): StudyDeck[] => {
  const maxNum: number = Number(getStorage(storageKeys.deckMax) ?? 0);
  const lastIndex = maxNum - offset;
  const results = [];
  for (let i = lastIndex; i >= lastIndex - limit; i--) {
    if (i < 0) break;

    const deck = getStorage(`${storageKeys.deck}${i}`);
    if (!deck) continue;

    results.push(JSON.parse(deck));
  }

  return results;
};

export const getDeck = (deckId: string): StudyDeck => {
  const deck = getStorage(`${storageKeys.deck}${deckId}`);

  if (!deck) {
    throw new Error('Deck not found');
  }

  return JSON.parse(deck);
};

export const addCardToDeck = (deckId: string, cardId: string) => {
  const deck = getStorage(`${storageKeys.deck}${deckId}`);
  if (!deck) {
    notification.error({
      message: 'Deck not found',
    });
    throw new Error('Deck not found');
  }

  const deckObj = JSON.parse(deck);

  if (deckObj.cards.includes(cardId)) {
    return;
  }

  deckObj.cards.push(cardId);
  setStorage(`${storageKeys.deck}${deckId}`, deckObj);
};

export const removeCardFromDeck = (deckId: string, cardId: string) => {
  const deck = getStorage(`${storageKeys.deck}${deckId}`);
  if (!deck) {
    notification.error({
      message: 'Deck not found',
    });
    throw new Error('Deck not found');
  }

  const deckObj = JSON.parse(deck);

  deckObj.cards = deckObj.cards.filter((id: string) => id !== cardId);
  setStorage(`${storageKeys.deck}${deckId}`, deckObj);
};
