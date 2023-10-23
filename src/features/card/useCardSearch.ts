import { useCallback, useState } from 'react';
import { StudyCard } from './constant';

let searchTimer: NodeJS.Timeout;

export const useCardSearch = () => {
  const [allCards, setAllCards] = useState<StudyCard[]>([]);
  const [filterdCards, setFilterdCards] = useState<StudyCard[]>([]);

  const initCards = useCallback((cards: StudyCard[]) => {
    setAllCards(cards);
    setFilterdCards(cards);
  }, []);

  const searchCards = useCallback(
    (word: string) => {
      clearTimeout(searchTimer);
      setTimeout(() => {
        setFilterdCards(allCards.filter((card) => card.texts.some((text) => text.includes(word))));
      }, 1500);
    },
    [allCards]
  );

  return [filterdCards, initCards, searchCards] as const;
};
