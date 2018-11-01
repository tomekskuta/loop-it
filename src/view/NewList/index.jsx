import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import strings from '../../locale';

import { Card, CardHeader, CardContent, TextField } from '@material-ui/core';

const StyledCard = styled(Card)`
  cursor: default;
`;

const NewList = () => {
  const {
    newList: { name, title }
  } = strings;
  return (
    <StyledCard>
      <CardHeader title={title} />
      <CardContent>
        <TextField label={name} margin="dense" />
      </CardContent>
    </StyledCard>
  );
};

NewList.propTypes = {
  addList: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  hideNewList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  locale: state.locale
});

const mapDispatchToProps = dispatch => ({
  addList: dispatch.lists.addList
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewList);
