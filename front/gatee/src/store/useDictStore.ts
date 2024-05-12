import {create} from "zustand";

interface Dictionary {
  featureId: number,
  question: string
}

interface DictStore {
  askList: Dictionary[]
  setAskList: (newAskList: Dictionary[]) => void
  askIndex:number,
  setAskIndex: (newAskIndex: number) => void,
}


export const useDictStore = create<DictStore>(
  (set) => ({
    askList: [],
    setAskList: (newAskList: Dictionary[]) => set({askList: newAskList}),
    askIndex:0,
    setAskIndex: (newAskIndex: number) => set({askIndex: newAskIndex}),
  })
);