import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import List from './List';
import NewList from './NewList';
import { MainView as MainViewComponent } from './components';

const MainView = ({ lists, getLists }) => {
  const [isNewList, toggleNewList] = useState(false);

  useEffect(getLists, []);

  const hideNewList = () => toggleNewList(false);

  const shouldShowNewList = () => isNewList || lists.length === 0;

  const renderLists = () => {
    const currentLists = lists.map(list => <List key={list.id} list={list} tasks={list.tasks} />);
    return shouldShowNewList()
      ? [<NewList key="newList" hideNewList={hideNewList} />, ...currentLists]
      : currentLists;
  };

  return (
    <MainViewComponent
      showNewList={() => toggleNewList(true)}
      newListButtonDisabled={shouldShowNewList()}
    >
      {renderLists()}
    </MainViewComponent>
  );
};

MainView.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  getLists: PropTypes.func.isRequired
};

const stateToProps = state => ({ lists: state.lists });
const dispatchToProps = dispatch => ({ getLists: dispatch.lists.getLists });

export default connect(
  stateToProps,
  dispatchToProps
)(MainView);
