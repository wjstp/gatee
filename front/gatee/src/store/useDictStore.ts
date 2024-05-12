import {create} from "zustand";
import {Answer} from "@type/index";

interface Dictionary {
  featureId: number,
  question: string
}

interface DictStore {
  askList: Dictionary[]
  setAskList: (newAskList: Dictionary[]) => void
  askIndex:number,
  setAskIndex: (newAskIndex: number) => void,
  answerList: Answer[]
  setAnswerList: (newAnswerList: Answer[]) => void
}


export const useDictStore = create<DictStore>(
  (set) => ({
    askList: [],
    setAskList: (newAskList: Dictionary[]) => set({askList: newAskList}),
    askIndex:0,
    setAskIndex: (newAskIndex: number) => set({askIndex: newAskIndex}),
    answerList: [
      {
        featureId: 1,
        question: "일번문제?",
        answer: "어쩌구",
      }
    ],
    setAnswerList: (newAnswerList: Answer[]) => set({answerList: newAnswerList}),

  })
);