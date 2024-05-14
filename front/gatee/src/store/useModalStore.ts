import {create} from "zustand";

// interface NotificationPush {
//   title:string,
//   body:string,
// }
type ModalStore = {
  showModal: boolean;
  setShowModal: (newShow: boolean) => void;
  // showNotification: boolean;
  // setShowNotification: (newShow: boolean) => void;
  // notificationPopUp : NotificationPush|null,
  // setNotificationPopUp: (newPopUp: NotificationPush) => void
}

export const useModalStore = create<ModalStore>(
    (set) => ({
      showModal: false,
      setShowModal: (newShow: boolean) => set({ showModal: newShow }),
      // showNotification:false,
      // setShowNotification: (newShow: boolean) => set({ showNotification: newShow }),
      // notificationPopUp : null,
      // setNotificationPopUp: (newPopUp: NotificationPush) => set({notificationPopUp:newPopUp})
    })
);