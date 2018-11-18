export const getStorageItem = item => JSON.parse(localStorage.getItem(item));

export const setStorageItem = (key, item) => localStorage.setItem(key, JSON.stringify(item));
