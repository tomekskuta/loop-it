import format from 'date-fns/format';

import { List, Task } from '../helpers/constructors';
import { getStorageItem, setStorageItem } from '../helpers/localStorage';
import { setId, setNextCycleStart, getNow } from '../helpers/methods';

const getLists = () => getStorageItem('lists') || [];

const addList = (state, list) => {
  const id = setId(state);
  const nextCycleStart = format(setNextCycleStart(list.startDate, list.cycleLength));

  const newList = new List({ id, ...list, nextCycleStart });
  const lists = [newList, ...state];

  setStorageItem('lists', lists);
  return lists;
};

const addTask = (state, task) => {
  const currentList = state.find(list => list.id === task.listId);
  const id = setId(currentList.tasks);

  const newTask = new Task({ id, text: task.text });

  const tasks = [...currentList.tasks, newTask];
  const updatedList = { ...currentList, tasks, updated_at: getNow() };

  const updatedLists = state.map(list => (list.id === task.listId ? updatedList : list));

  setStorageItem('lists', updatedLists);
  return updatedLists;
};

const editTask = (state, taskData) => {
  const { value, editedProperty, taskId, listId } = taskData;
  const currentList = state.find(list => list.id === listId);
  const currentTask = currentList.tasks.find(task => task.id === taskId);

  const updatedTask = { ...currentTask, updated_at: getNow() };
  updatedTask[editedProperty] = value;
  const updatedTasks = currentList.tasks.map(task => (task.id === taskId ? updatedTask : task));
  const updatedList = { ...currentList, tasks: updatedTasks, updated_at: getNow() };
  const updatedLists = state.map(list => (list.id === listId ? updatedList : list));

  setStorageItem('lists', updatedLists);
  return updatedLists;
};

const lists = {
  state: [],
  reducers: {
    getLists,
    addList,
    addTask,
    editTask
  }
};

export default lists;
