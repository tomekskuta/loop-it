import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card, CardHeader, CardContent } from '@material-ui/core';

const CardWrapper = styled(Card)`
  cursor: default;
  margin: 1em;
`;

const ListWrapper = ({ children, title, subheader, actionButton }) => (
  <CardWrapper>
    <CardHeader title={title} subheader={subheader} action={actionButton} />
    <CardContent>{children}</CardContent>
  </CardWrapper>
);

ListWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  actionButton: PropTypes.node
};

ListWrapper.defaultProps = {
  subheader: null,
  action: null
};

export default ListWrapper;
