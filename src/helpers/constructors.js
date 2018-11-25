import { getNow } from './methods';

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
  created_at: getNow(),
  updated_at: getNow(),
  cycleLength,
  startDate,
  nextCycleStart,
  tasks: []
  // loopIt,
  // cycleEnd,
  // color
});

export const Task = ({ id, text }) => ({
  id,
  text,
  created_at: getNow(),
  updated_at: getNow(),
  done: false
});
