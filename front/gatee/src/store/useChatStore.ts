import { create } from "zustand";

type ChatStore = {
  showBottomBar: boolean;
  setShowBottomBar: (newShow: boolean) => void;
}

export const useChatStore = create<ChatStore>(
  (set) => ({
    showBottomBar: true,
    setShowBottomBar: (newShow: boolean) => set({ showBottomBar: newShow }),
  })
);