import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ListItem, Input, Button } from '@material-ui/core';

const StyledListItem = styled(ListItem)`
  padding: 0.5em 0 !important;
`;

const AddTask = ({ addTask }) => {
  return (
    <StyledListItem>
      <form onSubmit={addTask}>
        <Button type="submit" size="small">
          +
        </Button>
        <Input name="text" placeholder="zjeść jajecznicę" required />
      </form>
    </StyledListItem>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default AddTask;
