import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ListItem, ListItemSecondaryAction, Checkbox, Input, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledListItem = styled(ListItem)`
  &:first-child {
    padding: 0.5em 0;
  }
`;

const StyledSecondaryAction = styled(ListItemSecondaryAction)`
  display: flex;
`;

const StyledInput = styled(Input)`
  width: 120px;
`;

const StyledIconButton = styled(IconButton)`
  ${StyledListItem}:hover & {
    visibility: visible;
  }
`;

const Task = ({ task, setDone, changeText, deleteTask }) => {
  const { text, done } = task;

  return (
    <StyledListItem>
      <Checkbox checked={done} onChange={setDone} />
      <StyledSecondaryAction>
        <form onSubmit={changeText}>
          <StyledInput defaultValue={text} name="text" required />
        </form>
        <StyledIconButton onClick={deleteTask}>
          <DeleteIcon />
        </StyledIconButton>
      </StyledSecondaryAction>
    </StyledListItem>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    done: PropTypes.bool
  }).isRequired,
  setDone: PropTypes.func.isRequired,
  changeText: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default Task;
