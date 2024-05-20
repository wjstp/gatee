import { create } from "zustand";
import { FileRes } from "@type/index";

type ChatStore = {
  isShowBottomBar: boolean;
  isUserParticipant: Record<string, boolean>;
  setIsShowBottomBar: (newShow: boolean) => void;
  setIsUserParticipant: (appointmentId: number, newParticipants: boolean) => void;
  isNewMessage: boolean;
  setIsNewMessage: (newMessage: boolean) => void;
  photoDetailUrl: string;
  setPhotoDetailUrl: (photoDetailUrl: string) => void;
  files: FileRes[];
  setFiles: (newFiles: FileRes[]) => void;
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
    isNewMessage: false,
    setIsNewMessage: (newMessage: boolean) => set({ isNewMessage: newMessage }),
    photoDetailUrl: "",
    setPhotoDetailUrl: (newUrl: string) => set({ photoDetailUrl: newUrl }),
    files: [],
    setFiles: (newFiles: FileRes[]) => set({ files: newFiles })
  })
);
