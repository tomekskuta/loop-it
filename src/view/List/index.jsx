import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import distanceInWords from 'date-fns/distance_in_words';
import { useT } from 'react-i18next/hooks';

import en from 'date-fns/locale/en';
import pl from 'date-fns/locale/pl';

import List from '@material-ui/core/List';

import ListWrapper from '../components/ListWrapper';
import { AddTask, Task } from './components';

const locale = { en, pl };

const ExistList = ({ list, tasks, addTask, setTaskDone }) => {
  const { id, name, cycleLength, nextCycleStart } = list;

  const [t, i18n] = useT('lists');

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

  // const handleSetTaskDone = (checked, taskId) => {
  //   const taskData = { checked, taskId, listId: id };
  //   setTaskDone(taskData);
  // };

  const renderTasks = () =>
    tasks.map(task => (
      <Task
        key={task.id}
        task={task}
        setDone={(e, done) => setTaskDone({ done, taskId: task.id, listId: id })}
      />
    ));

  return (
    <ListWrapper title={name} subheader={timeToNextCycle}>
      <List disablePadding>
        {renderTasks()}
        <AddTask addTask={handleAddTask} />
      </List>
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
  addTask: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addTask: dispatch.lists.addTask,
  setTaskDone: dispatch.lists.setTaskDone
});

export default connect(
  null,
  mapDispatchToProps
)(ExistList);
