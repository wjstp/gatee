import { SCHEDULE_COLOR } from "@constants/index";
import {ScheduleColor} from "@type/index";
import ScheduleIconOrange from "@assets/images/schedule/ic_calendar_orange.png";

interface ColorInfo {
  code: string;
  image: string;
}

const getColorInfo = (value: string): ColorInfo => {
  const foundColor: ScheduleColor | undefined = SCHEDULE_COLOR.find(item => item.name === value);
  return foundColor ? { code: foundColor.code, image: foundColor.image } : {code: "#ffd291", image: ScheduleIconOrange};
};

export default getColorInfo;