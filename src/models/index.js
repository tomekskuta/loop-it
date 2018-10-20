import { init } from '@rematch/core';
import logger from 'redux-logger';

const store = init({
  redux: {
    middlewares: [logger]
  },
  models: {}
});

export default store;
