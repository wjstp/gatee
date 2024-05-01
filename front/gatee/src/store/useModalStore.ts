import {create} from "zustand";
import {persist} from "zustand/middleware";

type ModalStore = {
  showModal: boolean;
  setShowModal: (newShow: boolean) => void;
}

export const useModalStore = create<ModalStore>()(
  persist(
    (set) => ({
      showModal: false,
      setShowModal: (newShow: boolean) => set({ showModal: newShow }),
    }),
    {
      name: "modal",
    }
  )
);