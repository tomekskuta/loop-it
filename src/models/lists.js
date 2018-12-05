import isFuture from 'date-fns/is_future';

import { List, Task } from '../helpers/constructors';
import { getStorageItem, setStorageItem } from '../helpers/localStorage';
import { setId, setNextCycleStart, getNow } from '../helpers/methods';

const getLists = () => {
  const currentLists = getStorageItem('lists') || [];
  const updatedLists = currentLists.map(list => {
    const { nextCycleStart, tasks } = list;
    if (!isFuture(nextCycleStart)) {
      const updatedTasks = tasks.map(task => ({ ...task, done: false }));
      return {
        ...list,
        nextCycleStart: setNextCycleStart(nextCycleStart, list.cycleLength),
        tasks: updatedTasks,
        updated_at: getNow()
      };
    }
    return list;
  });

  setStorageItem('lists', updatedLists);
  return updatedLists;
};

const addList = (state, list) => {
  const id = setId(state);
  const nextCycleStart = setNextCycleStart(list.startDate, list.cycleLength);

  const newList = new List({ id, ...list, nextCycleStart });
  const lists = [newList, ...state];

  setStorageItem('lists', lists);
  return lists;
};

const editList = (state, list) => {
  const { id, editedProperty, value } = list;
  const currentList = state.find(elem => elem.id === id);

  if (typeof editedProperty === 'string') currentList[editedProperty] = value;
  else currentList[editedProperty[0]][editedProperty[1]] = value;

  currentList.updated_at = getNow();
  const updatedLists = state.map(elem => (elem.id === id ? currentList : elem));

  setStorageItem('lists', updatedLists);
  return updatedLists;
};

const deleteList = (state, listId) => {
  const updatedLists = state.filter(list => list.id !== listId);
  setStorageItem('lists', updatedLists);
  return updatedLists;
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
  currentTask.updated_at = getNow();
  currentTask[editedProperty] = value;

  const updatedTasks = currentList.tasks.map(task => (task.id === taskId ? currentTask : task));
  const updatedList = { ...currentList, tasks: updatedTasks, updated_at: getNow() };

  const updatedLists = state.map(list => (list.id === listId ? updatedList : list));

  setStorageItem('lists', updatedLists);
  return updatedLists;
};

const deleteTask = (state, taskData) => {
  const { taskId, listId } = taskData;
  const currentList = state.find(list => list.id === listId);
  currentList.tasks = currentList.tasks.filter(task => task.id !== taskId);
  const updatedLists = state.map(list => (list.id === listId ? currentList : list));

  setStorageItem('lists', updatedLists);
  return updatedLists;
};

const lists = {
  state: [],
  reducers: { getLists, addList, editList, deleteList, addTask, editTask, deleteTask }
};

export default lists;
