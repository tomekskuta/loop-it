import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${props => (props.theme.colors ? props.theme.colors.mainBackground : '#fff')};
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  height: 100%;
  flex-grow: 1;
  padding: 2em;
  cursor: ${({ isNewListOpen }) => (isNewListOpen ? 'default' : 'pointer')};
`;

const ListsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MainView = ({ header, children, showNewList, listsRef, noListsInfo }) => (
  <MainWrapper>
    {header}
    <ContentWrapper onClick={showNewList}>
      <ListsWrapper ref={listsRef}>{children}</ListsWrapper>
      {noListsInfo}
    </ContentWrapper>
  </MainWrapper>
);

MainView.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  showNewList: PropTypes.func.isRequired,
  listsRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  noListsInfo: PropTypes.node.isRequired
};

export default MainView;
