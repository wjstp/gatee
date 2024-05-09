import {create} from "zustand";

type ModalStore = {
  showModal: boolean;
  setShowModal: (newShow: boolean) => void;
}

export const useModalStore = create<ModalStore>(
    (set) => ({
      showModal: false,
      setShowModal: (newShow: boolean) => set({ showModal: newShow }),
    })
);