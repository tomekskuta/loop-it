import moment from 'moment';

export const setId = elements => {
  if (!elements || elements.length === 0) return 1;
  const lastId = Math.max(...elements.map(elem => elem.id));
  return lastId + 1;
};

export const cyclePeriods = [
  { value: 'd', label: 'days' },
  { value: 'w', label: 'weeks' },
  { value: 'M', label: 'months' }
];

export const List = ({
  id,
  name,
  loopIt,
  color,
  startDate,
  cycleLength,
  cycleEnd,
  nextCycleStart
}) => ({
  id,
  name,
  created_at: moment().format('YYYY-MM-DD HH:mm'),
  updated_at: moment().format('YYYY-MM-DD HH:mm'),
  cycleLength,
  startDate,
  nextCycleStart,
  tasks: []
  // loopIt,
  // cycleEnd,
  // color
});

export const Task = ({ id, name }) => ({
  id,
  name,
  created_at: moment().format('YYYY-MM-DD HH:mm'),
  updated_at: moment().format('YYYY-MM-DD HH:mm'),
  done: false
});
