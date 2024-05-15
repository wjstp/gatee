import {create} from "zustand";

interface NotificationPush {
  title:string,
  body:string,
  icon:string,
  url:string,
}
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