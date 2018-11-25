import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { AppBar, Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { useT } from 'react-i18next/hooks';

const AppBarContent = styled.div`
  display: flex;
  align-items: center;
`;

const IconButtonWrapper = styled.div`
  position: absolute;
  left: 1em;
`;

const Languages = styled.div`
  display: flex;
  align-items: flex-start;
  position: absolute;
  right: 1em;
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

const AppHeader = ({ showNewList, newListButtonDisabled }) => {
  const [, i18n] = useT();
  return (
    <AppBar color="default" position="relative">
      <AppBarContent>
        <IconButtonWrapper>
          <IconButton disabled={newListButtonDisabled} onClick={showNewList}>
            <AddIcon />
          </IconButton>
        </IconButtonWrapper>
        <Title>Loop it</Title>
        <Languages>{getLangButtons(i18n)}</Languages>
      </AppBarContent>
    </AppBar>
  );
};

AppHeader.propTypes = {
  showNewList: PropTypes.func.isRequired,
  newListButtonDisabled: PropTypes.bool.isRequired
};

export default AppHeader;
