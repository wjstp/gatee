import KoreanLunarCalendar, { CalendarData } from 'korean-lunar-calendar';

// 음력 변환
const calculateLunarDate = (date: Date): string => {
  const calendar: KoreanLunarCalendar = new KoreanLunarCalendar();
  calendar.setSolarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const lunarDate: CalendarData = calendar.getLunarCalendar();
  return `음 ${lunarDate.month}.${lunarDate.day}`;
};

export default calculateLunarDate;
