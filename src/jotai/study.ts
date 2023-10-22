import { atom } from 'jotai';

export type StudyType = 'all' | 'infrequently' | 'belowGoalCount';

export type StudyMode = {
  cardNum: number;
  cardType: StudyType;
};

export const studyModeAtom = atom<StudyMode>({
  cardNum: 10,
  cardType: 'all',
});
