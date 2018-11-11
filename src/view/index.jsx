import React, { useState, useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import List from './List';
import NewList from './NewList';
import { NoListsInfo, MainView as MainViewComponent } from './components';

const MainView = ({ lists, getLists }) => {
  let listsRef = React.createRef();

  const [isNewList, toggleNewList] = useState(false);

  useEffect(() => getLists(), []);

  const showNewList = event => !listsRef.current.contains(event.target) && toggleNewList(true);

  const hideNewList = () => toggleNewList(false);

  const renderLists = () => {
    const currentLists = lists.map(list => <List key={list.id} list={list} />);
    return isNewList
      ? [<NewList key="newList" hideNewList={hideNewList} />, ...currentLists]
      : currentLists;
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      <MainViewComponent
        header={<Header />}
        showNewList={showNewList}
        listsRef={listsRef}
        noListsInfo={lists.length === 0 && !isNewList && <NoListsInfo />}
      >
        {renderLists()}
      </MainViewComponent>
    </Suspense>
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
