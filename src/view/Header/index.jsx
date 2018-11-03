import React from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import { useT } from 'react-i18next/hooks';

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

const getLangButtons = i18n =>
  ['en', 'pl'].map(lang => (
    <Button
      key={lang}
      size="small"
      onClick={() => i18n.changeLanguage(lang)}
      variant={(i18n.language === lang && 'outlined') || 'text'}
    >
      {lang}
    </Button>
  ));

const Header = () => {
  const [, i18n] = useT();
  return (
    <AppBar color="default" position="relative">
      <Title>Loop it</Title>
      <Languages>{getLangButtons(i18n)}</Languages>
    </AppBar>
  );
};

export default Header;
