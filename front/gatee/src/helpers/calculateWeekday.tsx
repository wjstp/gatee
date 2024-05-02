import dayjs, {Dayjs} from "dayjs";

const calculateWeekday = (value: Dayjs | null) => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayjs(value).day();
  if (dayOfWeek) {
    return weekdays[dayOfWeek];
  } else {
    return '요일';
  }
};

export default calculateWeekday;