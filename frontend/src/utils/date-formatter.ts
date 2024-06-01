import { differenceInMinutes, formatRelative, format } from 'date-fns';
import { uk } from 'date-fns/locale';

const formatMessageDate = (date: string | Date) =>
  format(date, 'HH:mm dd.MM.yyyy');

const getDistanceInMinutes = (pastDate: string | Date) =>
  differenceInMinutes(new Date(), pastDate);

const formatRelativeToNow = (date: string | Date, locale: 'en' | 'ua') =>
  formatRelative(date, Date.now(), {
    locale: locale === 'en' ? null : uk,
  });

const formatForSend = (date: string | Date) =>
  format(date || new Date(), 'yyyy-MM-dd');

const DateFormatter = {
  formatMessageDate,
  getDistanceInMinutes,
  formatRelativeToNow,
  formatForSend,
};

export default DateFormatter;
