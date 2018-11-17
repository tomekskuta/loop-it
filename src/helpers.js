import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import addWeeks from 'date-fns/add_weeks';
import addMonths from 'date-fns/add_months';

export const setId = elements => {
  if (!elements || elements.length === 0) return 1;
  const lastId = Math.max(...elements.map(elem => elem.id));
  return lastId + 1;
};

export const cyclePeriods = [
  { value: 'D', label: 'days' },
  { value: 'W', label: 'weeks' },
  { value: 'M', label: 'months' }
];

export const setNextCycleStart = (date, { count, period }) => {
  if (period === 'D') return addDays(date, count);
  if (period === 'W') return addWeeks(date, count);
  return addMonths(date, count);
};

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
  created_at: format(new Date()),
  updated_at: format(new Date()),
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
  created_at: format(new Date()),
  updated_at: format(new Date()),
  done: false
});
