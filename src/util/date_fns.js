import { format, addHours } from 'date-fns';

const DateFns = (() => {
  const getDate = date => format(date, 'PPpp');

  const getWeekday = date => format(date, 'cccc');

  const getShortWeekday = date => format(date, 'ccc');

  const getDesLocalTime = (desOffsetUTC) => {
    const localNow = new Date();
    const localOffsetUTC = localNow.getTimezoneOffset() / 60;

    return addHours(localNow, localOffsetUTC + desOffsetUTC);
  };

  const checkNight = date => {
    const hour = date.getHours();
    if (hour >= 6 && hour <= 18) return false;
    return true;
  }

  return {
    getDate,
    getWeekday,
    getShortWeekday,
    getDesLocalTime,
    checkNight,
  };
})();

export default DateFns;
