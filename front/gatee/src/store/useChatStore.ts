import { create } from "zustand";

type ChatStore = {
  isShowBottomBar: boolean;
  isUserParticipant: boolean;
  setIsShowBottomBar: (newShow: boolean) => void;
  setIsUserParticipant: (newParticipants: boolean) => void;
}

export const useChatStore = create<ChatStore>(
  (set) => ({
    isShowBottomBar: true,
    isUserParticipant: true,
    setIsShowBottomBar: (newShow: boolean) => set({ isShowBottomBar: newShow }),
    setIsUserParticipant: (newParticipants: boolean) => set({ isUserParticipant: newParticipants }),
  })
);
