export const setId = elements => {
  const lastId = Math.max(...elements.map(elem => elem.id));
  return lastId > 0 ? lastId + 1 : 1;
};
