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

const ListsWrapper = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  padding: 2em;
  cursor: ${({ isNewListOpen }) => (isNewListOpen ? 'default' : 'pointer')};
`;

const MainView = ({ header, children, showNewList }) => (
  <MainWrapper>
    {header}
    <ListsWrapper onClick={showNewList}>{children}</ListsWrapper>
  </MainWrapper>
);

MainView.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  showNewList: PropTypes.func.isRequired
};

export default MainView;
