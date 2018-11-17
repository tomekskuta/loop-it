import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './i18n.js';
import { Normalize } from 'styled-normalize';

import store from './models';
import { GlobalStyles, theme } from './styles';

import View from './view';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Normalize />
        <GlobalStyles />
        <View />
      </Fragment>
    </ThemeProvider>
  </Provider>
);

export default App;
