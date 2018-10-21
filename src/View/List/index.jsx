import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { list } = this.props;
    return <div>{list.name}</div>;
  }
}

export default List;
