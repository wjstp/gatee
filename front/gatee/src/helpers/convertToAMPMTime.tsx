import dayjs from 'dayjs';

// 오후 오전 형식으로 변환
const convertToAMPMTime = (date: string) => {
  const dateTime = dayjs(date);
  const ampm: string = dateTime.hour() >= 12 ? '오후' : '오전';

  return `${ampm} ${dateTime.format('hh:mm')}`;
};

export default convertToAMPMTime;