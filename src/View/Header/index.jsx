import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Settings from '../Settings';

const HeaderWrapper = styled.div`
  display: flex;
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HeaderWrapper>
        <Settings />
      </HeaderWrapper>
    );
  }
}

export default Header;
