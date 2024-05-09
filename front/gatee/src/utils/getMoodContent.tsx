import { MOOD } from "@constants/index";

const getMoodContent = (moodName: string | null) => {
  const mood = MOOD.find((mood) => mood.name === moodName);
  return mood ? mood.content : null;
};

export default getMoodContent;