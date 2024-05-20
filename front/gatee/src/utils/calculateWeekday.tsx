import dayjs, { Dayjs } from "dayjs";

const calculateWeekday = (value: Dayjs | null) => {
  if (value) {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = dayjs(value).day();
    return weekdays[dayOfWeek];
  } else {
    return '';
  }
};

export default calculateWeekday;