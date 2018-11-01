import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from './models';
import { GlobalStyles, theme } from './styles';

import View from './hackDirectory';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyles />
        <View />
      </Fragment>
    </ThemeProvider>
  </Provider>
);

export default App;
