import { MOOD } from "@constants/index";

const getMoodEmoji = (moodName: string | null) => {
  const mood = MOOD.find((mood) => mood.name === moodName);
  return mood ? mood.mood : null;
};

export default getMoodEmoji;