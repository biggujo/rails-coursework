import { differenceInMinutes, formatRelative, format } from 'date-fns';

const formatMessageDate = (date: string | Date) =>
  format(date, 'HH:mm dd.MM.yyyy');

const getDistanceInMinutes = (pastDate: string | Date) =>
  differenceInMinutes(new Date(), pastDate);

const formatRelativeToNow = (date: string | Date) =>
  formatRelative(date, Date.now());

const formatForSend = (date: string | Date) =>
  format(date || new Date(), 'yyyy-MM-dd');

const DateFormatter = {
  formatMessageDate,
  getDistanceInMinutes,
  formatRelativeToNow,
  formatForSend,
};

export default DateFormatter;
