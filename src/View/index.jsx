import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import MainWrapper from './components/MainWrapper';

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getLists();
  }

  render() {
    return (
      <MainWrapper>
        <Header />
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
