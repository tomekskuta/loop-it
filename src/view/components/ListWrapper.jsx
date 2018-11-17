import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card, CardHeader, CardContent } from '@material-ui/core';

const CardWrapper = styled(Card)`
  cursor: default;
  margin: 1em;
`;

const ListWrapper = ({ children, title, subheader }) => (
  <CardWrapper>
    <CardHeader title={title} subheader={subheader} />
    <CardContent>{children}</CardContent>
  </CardWrapper>
);

ListWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

ListWrapper.defaultProps = {
  subheader: null
};

export default ListWrapper;
