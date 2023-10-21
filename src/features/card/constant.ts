export type InputCard = {
  id: string; // UUID;
  text: string;
};

export type StudyCard = {
  storeId: string;
  texts: string[];
  createdAt: string;
  goalCount?: number;
  usedCount?: number;
};
