import format from 'date-fns/format';

import { setId, List, setNextCycleStart } from '../helpers';

const getLists = () => JSON.parse(localStorage.getItem('lists')) || [];

const addList = (state, list) => {
  const id = setId(state);
  const nextCycleStart = format(setNextCycleStart(list.startDate, list.cycleLength));

  const newList = new List({ id, ...list, nextCycleStart });
  const lists = [newList, ...state];

  localStorage.setItem('lists', JSON.stringify(lists));
  return lists;
};

const lists = {
  state: [],
  reducers: {
    getLists,
    addList,
    addTask: (state, lists) => state,
    editTask: (state, lists) => state
  }
};

export default lists;
