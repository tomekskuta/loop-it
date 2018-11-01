import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import List from './List';
import NewList from './NewList';
import { NoListsInfo, MainView as MainViewComponent } from './components';

const MainView = ({ lists, getLists, getLocale }) => {
  let listsRef = React.createRef();

  const [isNewList, toggleNewList] = useState(false);

  useEffect(() => {
    getLists();
    getLocale();
  }, []);

  const showNewList = event => !listsRef.current.contains(event.target) && toggleNewList(true);

  const hideNewList = () => toggleNewList(false);

  const renderLists = () => {
    const currentLists = lists.map(list => <List key={list.id} list={list} />);
    return isNewList
      ? [<NewList key="newList" hideNewList={hideNewList} />, ...currentLists]
      : currentLists;
  };

  return (
    <MainViewComponent header={<Header />} showNewList={showNewList}>
      <div ref={listsRef}>{renderLists()}</div>
      {lists.length === 0 && !isNewList && <NoListsInfo />}
    </MainViewComponent>
  );
};

MainView.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  getLists: PropTypes.func.isRequired,
  getLocale: PropTypes.func.isRequired
};

const stateToProps = state => ({ lists: state.lists });

const dispatchToProps = dispatch => ({
  getLists: dispatch.lists.getLists,
  getLocale: dispatch.locale.getLocale
});

export default connect(
  stateToProps,
  dispatchToProps
)(MainView);
