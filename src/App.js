import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from './models';
import { GlobalStyles, theme } from './styles';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div>
            <GlobalStyles />
            loop-it
          </div>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
