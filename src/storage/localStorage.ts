export const storageKeys = {
  cardMax: 'card-max',
  card: 'card-',
};

export const getStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const setStorage = (key: string, value: any, jsonize = true) => {
  const setValue = jsonize ? JSON.stringify(value) : value;

  return localStorage.setItem(key, setValue);
};
