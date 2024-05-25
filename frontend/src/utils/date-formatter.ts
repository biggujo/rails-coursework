import { format } from 'date-fns';

const formatMessageDate = (date: string) => format(date, 'HH:mm dd.MM.yyyy');

const DateFormatter = {
  formatMessageDate,
};

export default DateFormatter;
