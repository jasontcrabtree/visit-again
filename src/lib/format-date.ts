import { format, parseISO } from 'date-fns';

const formatDate = (date: string) => {
  return format(parseISO(date), 'EEEE, do MMM yyyy').toString();
};

export default formatDate;
