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

import { ListWrapper, Modal } from '../components';
import { AddTask, Task, ListMenu } from './components';

import { CYCLE_PERIODS } from '../../helpers/constants';

const locale = { en, pl };

const ExistList = ({ list, tasks, addTask, editTask, editList, deleteList }) => {
  const { id, name, cycleLength, nextCycleStart, startDate } = list;

  const [t, i18n] = useT('lists');

  const [isMenu, toggleMenu] = useState(false);
  const [isModal, toggleModal] = useState(false);

  const timeToNextCycle =
    !(cycleLength.period === 'D' && cycleLength.count === '1') &&
    `${t('Next cycle in')} ${distanceInWords(new Date(), nextCycleStart, {
      locale: locale[i18n.language]
    })}`;

  const handleEditList = (value, editedProperty) => editList({ id, editedProperty, value });

  const handleEditName = event => {
    event.preventDefault();
    handleEditList(event.target.name.value, 'name');
  };

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
      title={
        <form onSubmit={handleEditName}>
          <Input defaultValue={name} name="name" required />
        </form>
      }
      subheader={timeToNextCycle}
      actionButton={
        <IconButton onClick={() => toggleMenu(!isMenu)}>
          {isMenu ? <ArrowBackIcon /> : <MoreVertIcon />}
        </IconButton>
      }
    >
      {isMenu ? (
        <ListMenu
          deleteList={() => toggleModal(true)}
          periodOptions={renderLengthOptions}
          cycleLength={cycleLength.count}
          setCycleLength={e => handleEditList(e.target.value, ['cycleLength', 'count'])}
          currentPeriod={cycleLength.period}
          setPeriod={e => handleEditList(e.target.value, ['cycleLength', 'period'])}
          startDate={startDate}
          setStartDate={e => handleEditList(e.target.value, 'startDate')}
        />
      ) : (
        <List disablePadding>
          {renderTasks()}
          <AddTask addTask={handleAddTask} />
        </List>
      )}
      <Modal
        open={isModal}
        onClose={() => toggleModal(false)}
        onSubmit={() => deleteList(id)}
        contentText={t('Are you sure?')}
        submitText={t('delete')}
      />
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
  editTask: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  editList: dispatch.lists.editList,
  addTask: dispatch.lists.addTask,
  editTask: dispatch.lists.editTask,
  deleteList: dispatch.lists.deleteList
});

export default connect(
  null,
  mapDispatchToProps
)(ExistList);
