import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemSecondaryAction, Checkbox, Input } from '@material-ui/core';

const Task = ({ task, setDone }) => {
  const { text, done } = task;

  return (
    <ListItem>
      <Checkbox checked={done} onChange={setDone} />
      <ListItemSecondaryAction>
        <Input defaultValue={text} />
      </ListItemSecondaryAction>
    </ListItem>
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
  setDone: PropTypes.func.isRequired
};

export default Task;
