import { SCHEDULE_COLOR } from "@constants/index";

const getColorCode = (value: string): string => {
  const foundColor = SCHEDULE_COLOR.find(item => item.name === value);
  return foundColor ? foundColor.code : "#FFFFFFFF";
};

export default getColorCode;