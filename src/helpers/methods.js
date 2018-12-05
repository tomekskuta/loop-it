import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import addWeeks from 'date-fns/add_weeks';
import addMonths from 'date-fns/add_months';
import isFuture from 'date-fns/is_future';

export const setId = elements => {
  if (!elements || elements.length === 0) return 1;
  const lastId = Math.max(...elements.map(elem => elem.id));
  return lastId + 1;
};

export const getNow = () => format(new Date());

export const setNextCycleStart = (date, { count, period }) => {
  let nextCycleStart = date;

  const addPeriod = () => {
    if (period === 'D') return addDays(nextCycleStart, count);
    if (period === 'W') return addWeeks(nextCycleStart, count);
    if (period === 'M') return addMonths(nextCycleStart, count);
  };
  const checkStartDate = () => {
    if (isFuture(nextCycleStart)) return;
    nextCycleStart = addPeriod();
    checkStartDate();
  };

  checkStartDate();
  return format(nextCycleStart);
};
