import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import strings from '../../locale';

const Languages = styled.div`
  display: flex;
  align-items: flex-start;
  position: absolute;
  right: 0;
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
`;

const Header = ({ setLocale, locale }) => (
  <AppBar color="default" position="relative">
    <Title>Loop it</Title>
    <Languages>
      {strings.getAvailableLanguages().map(lang => (
        <Button
          key={lang}
          size="small"
          onClick={() => setLocale(lang)}
          variant={(locale === lang && 'outlined') || 'text'}
        >
          {lang}
        </Button>
      ))}
    </Languages>
  </AppBar>
);

Header.propTypes = {
  setLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  locale: state.locale
});

const mapDispatchToProps = dispatch => ({
  setLocale: lang => dispatch.locale.setLocale(lang)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
