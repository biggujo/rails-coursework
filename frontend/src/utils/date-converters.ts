import { format, parseISO } from 'date-fns';

const extractReadable = (date: string) =>
  format(parseISO(date), 'HH:mm dd.MM.uuuu');

const DateConverters = {
  extractReadable,
};

export default DateConverters;
