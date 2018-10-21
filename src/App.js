import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from './models';
import { GlobalStyles, theme } from './styles';
import strings from './locale';

import View from './View';
class App extends Component {
  componentWillMount() {
    this.getLocale();
  }

  getLocale = () => {
    const currentLocale = localStorage.getItem('locale');
    if (currentLocale) strings.setLanguage(currentLocale);
    else localStorage.setItem('locale', strings.getLanguage());
  };

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div>
            <GlobalStyles />
            <View />
          </div>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
