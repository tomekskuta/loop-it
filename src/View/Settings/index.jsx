import React, { Component } from 'react';
import PropTypes from 'prop-types';

import strings from '../../locale';

const Language = ({ onChange, value }) => (
  <select value={value} onChange={onChange}>
    {strings.getAvailableLanguages().map(lang => (
      <option key={lang} value={lang}>
        {lang}
      </option>
    ))}
  </select>
);
Language.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: ''
    };
  }

  componentDidMount() {
    this.setState({ language: strings.getLanguage() });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.language !== this.state.language) {
      strings.setLanguage(nextState.language);
      localStorage.setItem('locale', nextState.language);
    }
  }

  changeLanguage = event => this.setState({ language: event.target.value });

  render() {
    const { language } = this.state;
    return (
      <div>
        <Language onChange={this.changeLanguage} value={language} />
        <div>{strings.noLists}</div>
        <div>{strings.getLanguage()}</div>
      </div>
    );
  }
}

export default Settings;
