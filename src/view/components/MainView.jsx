import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AppHeader from './AppHeader';

const MainWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => (theme.colors ? theme.colors.mainBackground : '#fff')};
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  height: 100%;
  flex-grow: 1;
  padding: 2em;
`;

const ListsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MainView = ({ children, showNewList, newListButtonDisabled }) => (
  <MainWrapper>
    <AppHeader showNewList={showNewList} newListButtonDisabled={newListButtonDisabled} />
    <ContentWrapper>
      <ListsWrapper>{children}</ListsWrapper>
    </ContentWrapper>
  </MainWrapper>
);

MainView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  showNewList: PropTypes.func.isRequired,
  newListButtonDisabled: PropTypes.bool.isRequired
};

export default MainView;
