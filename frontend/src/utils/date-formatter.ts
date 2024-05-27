import { differenceInMinutes, format } from 'date-fns';

const formatMessageDate = (date: string) => format(date, 'HH:mm dd.MM.yyyy');

const getDistanceInMinutes = (pastDate: string) =>
  differenceInMinutes(new Date(), pastDate);

const DateFormatter = {
  formatMessageDate,
  getDistanceInMinutes,
};

export default DateFormatter;
