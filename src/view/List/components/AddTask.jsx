import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, Input, Button } from '@material-ui/core';

const AddTask = ({ addTask }) => {
  return (
    <ListItem>
      <form onSubmit={addTask}>
        <Button type="submit" size="small">
          +
        </Button>
        <Input name="text" type="text" required />
      </form>
    </ListItem>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default AddTask;
