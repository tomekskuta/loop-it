import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import List from './List';
import { NoListsInfo } from './components';

const MainWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${props => (props.theme.colors ? props.theme.colors.mainBackground : '#fff')};
  display: flex;
  flex-direction: column;
`;

const ListsWrapper = styled.div`
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = { createNewList: false };

    this.lists = React.createRef();
  }

  componentDidMount() {
    this.props.getLists();
  }

  openNewList = event =>
    !this.lists.current.contains(event.target) && this.setState({ createNewList: true });

  render() {
    const { lists } = this.props;
    return (
      <MainWrapper>
        <Header />
        <ListsWrapper onClick={this.openNewList}>
          <div ref={this.lists}>
            {lists.map(list => (
              <List key={list.id} list={list} />
            ))}
          </div>
          {lists.length === 0 && <NoListsInfo />}
        </ListsWrapper>
      </MainWrapper>
    );
  }
}

MainView.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  getLists: PropTypes.func.isRequired
};

const stateToProps = state => ({
  lists: state.lists
});

const dispatchToProps = dispatch => ({
  getLists: dispatch.lists.getLists
});

export default connect(
  stateToProps,
  dispatchToProps
)(MainView);
