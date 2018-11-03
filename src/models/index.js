import { init } from '@rematch/core';
import logger from 'redux-logger';

import lists from './lists';
import openedList from './openedList';

const store = init({
  redux: {
    middlewares: [logger]
  },
  models: {
    lists,
    openedList
  }
});

export default store;
