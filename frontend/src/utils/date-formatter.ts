import { differenceInMinutes, formatRelative, format } from 'date-fns';

const formatMessageDate = (date: string) => format(date, 'HH:mm dd.MM.yyyy');

const getDistanceInMinutes = (pastDate: string) =>
  differenceInMinutes(new Date(), pastDate);

const formatRelativeToNow = (date: string) => formatRelative(date, Date.now());

const DateFormatter = {
  formatMessageDate,
  getDistanceInMinutes,
  formatRelativeToNow,
};

export default DateFormatter;
