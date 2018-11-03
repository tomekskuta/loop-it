import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useT } from 'react-i18next/hooks';

import { Card, CardHeader, CardContent, TextField } from '@material-ui/core';

const StyledCard = styled(Card)`
  cursor: default;
`;

const NewList = () => {
  const [t] = useT('lists');
  return (
    <StyledCard>
      <CardHeader title={t('newListHeader')} />
      <CardContent>
        <TextField label={t('name')} margin="dense" />
      </CardContent>
    </StyledCard>
  );
};

NewList.propTypes = {
  addList: PropTypes.func.isRequired,
  hideNewList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addList: dispatch.lists.addList
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewList);
