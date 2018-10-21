import moment from 'moment';
import { setId } from '../helpers';

const List = ({ id, name, loopIt, color, endDate, cycleLength, cycleEnd }) => ({
  id,
  name,
  created_at: moment().format('x'),
  updated_at: moment().format('x'),
  loopIt,
  endDate,
  cycleLength,
  cycleEnd,
  color
});

const lists = {
  state: [],
  reducers: {
    getLists: () => JSON.parse(localStorage.getItem('lists')) || [],
    addList: (state, lists) => lists,
    addTask: (state, lists) => lists,
    editTask: (state, lists) => lists
  },
  effects: {
    createList(data, state) {
      const id = setId(state.lists);
      const newList = new List({ id, ...data });
      const lists = [newList, ...state.lists];
      localStorage.setItem('lists', JSON.stringify(lists));
      this.addList(lists);
    }
  }
};

export default lists;
