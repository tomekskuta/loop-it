import { init } from '@rematch/core';
import logger from 'redux-logger';

import openedList from './openedList';
import listOrder from './listsOrder';

const store = init({
  redux: {
    middlewares: [logger]
  },
  models: {
    openedList,
    listOrder
  }
});

export default store;
