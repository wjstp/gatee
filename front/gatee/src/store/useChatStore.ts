import { create } from "zustand";

type ChatStore = {
  isShowBottomBar: boolean;
  isUserParticipant: Record<string, boolean>; // 각 약속별로 상태 관리
  setIsShowBottomBar: (newShow: boolean) => void;
  setIsUserParticipant: (appointmentId: number, newParticipants: boolean) => void;
}

export const useChatStore = create<ChatStore>(
  (set) => ({
    isShowBottomBar: true,
    isUserParticipant: {},
    setIsShowBottomBar: (newShow: boolean) => set({ isShowBottomBar: newShow }),
    setIsUserParticipant: (appointmentId: number, newIsUserParticipant: boolean) =>
      set((state) => ({
        isUserParticipant: {
          ...state.isUserParticipant,
          [appointmentId]: newIsUserParticipant, // 해당 약속의 상태만 업데이트
        },
      })),
  })
);
