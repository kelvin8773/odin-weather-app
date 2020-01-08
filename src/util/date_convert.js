import { format, addHours } from 'date-fns';

const DateConvert = (() => {
  const getDate = (date) => {
    return format(date, 'PPpp');
  }

  const getWeekday = (date) => {
    return format(date, 'cccc');
  }

  const getShortWeekday = date => {
    return format(date, 'ccc');
  }

  const getDesLocalTime = (desOffsetUTC) => {
    const localNow = new Date();
    const localOffsetUTC = localNow.getTimezoneOffset() / 60;

    return addHours(localNow, localOffsetUTC + desOffsetUTC);
  }

  return {
    getDate,
    getWeekday,
    getShortWeekday,
    getDesLocalTime
  }

})();

export default DateConvert;