import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import distanceInWords from 'date-fns/distance_in_words';
import { useT } from 'react-i18next/hooks';

import en from 'date-fns/locale/en';
import pl from 'date-fns/locale/pl';

import { List, IconButton, Input } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ListWrapper from '../components/ListWrapper';
import { AddTask, Task, ListMenu } from './components';

import { CYCLE_PERIODS } from '../../helpers/constants';

const locale = { en, pl };

const ExistList = ({ list, tasks, addTask, editTask }) => {
  const { id, name, cycleLength, nextCycleStart, startDate } = list;

  const [t, i18n] = useT('lists');

  const [isMenu, showMenu] = useState(false);

  const timeToNextCycle =
    !(cycleLength.period === 'D' && cycleLength.count === '1') &&
    `${t('Next cycle in')} ${distanceInWords(new Date(), nextCycleStart, {
      locale: locale[i18n.language]
    })}`;

  const handleAddTask = event => {
    event.preventDefault();
    const newTask = {
      listId: id,
      text: event.target.text.value
    };
    addTask(newTask);
    event.target.text.value = '';
  };

  const handleSetTaskDone = (value, taskId) => {
    const taskData = { editedProperty: 'done', value, taskId, listId: id };
    editTask(taskData);
  };

  const handleChangeTaskText = (event, taskId) => {
    event.preventDefault();
    const taskData = { editedProperty: 'text', value: event.target.text.value, taskId, listId: id };
    editTask(taskData);
  };

  const renderTasks = () =>
    tasks.map(task => (
      <Task
        key={task.id}
        task={task}
        setDone={(e, done) => handleSetTaskDone(done, task.id)}
        changeText={event => handleChangeTaskText(event, task.id)}
      />
    ));

  const renderLengthOptions = CYCLE_PERIODS.map(periodOption => (
    <option key={periodOption.value} value={periodOption.value}>
      {t(`periods.${periodOption.label}`)}
    </option>
  ));

  return (
    <ListWrapper
      title={<Input defaultValue={name} name="text" required />}
      subheader={timeToNextCycle}
      actionButton={
        <IconButton onClick={() => showMenu(!isMenu)}>
          {isMenu ? <ArrowBackIcon /> : <MoreVertIcon />}
        </IconButton>
      }
    >
      {isMenu ? (
        <ListMenu
          deleteList={() => console.log('delete', id)}
          periodOptions={renderLengthOptions}
          cycleLength={cycleLength.count}
          setCycleLength={() => console.log('cycleLength')}
          currentPeriod={cycleLength.period}
          setPeriod={() => console.log('setPeriod', id)}
          startDate={startDate}
          setStartDate={() => console.log('startDate')}
        />
      ) : (
        <List disablePadding>
          {renderTasks()}
          <AddTask addTask={handleAddTask} />
        </List>
      )}
    </ListWrapper>
  );
};

ExistList.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    cycleLength: PropTypes.object,
    startDate: PropTypes.string,
    nextCycleStart: PropTypes.string,
    tasks: PropTypes.array
  }).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addTask: dispatch.lists.addTask,
  editTask: dispatch.lists.editTask
});

export default connect(
  null,
  mapDispatchToProps
)(ExistList);
