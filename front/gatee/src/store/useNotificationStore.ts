import {create} from "zustand";
import {NotificationRes} from "@type/index";

interface NotificationPush {
  title:string,
  body:string,
  icon:string,
  url:string,
}
type NotificationStore = {
  showNotification: boolean;
  setShowNotification: (newShow: boolean) => void;
  notificationPopUp : NotificationPush|null,
  setNotificationPopUp: (newPopUp: NotificationPush|null) => void,
  notificationDataList:NotificationRes[]
  setNotificationDataList:(newDataList:NotificationRes[])=>void
  setNotificationChecked:(id:string)=> void
}

export const useNotificationStore = create<NotificationStore>(
    (set) => ({
      showNotification:false,
      setShowNotification: (newShow: boolean) => set({ showNotification: newShow }),
      notificationPopUp : null,
      setNotificationPopUp: (newPopUp: NotificationPush|null) => set({notificationPopUp:newPopUp}),
      notificationDataList:[],
      setNotificationDataList:(newDataList:NotificationRes[]) => set({notificationDataList:newDataList}),
      setNotificationChecked: (id: string) => {
        set((state) => ({
          notificationDataList: state.notificationDataList.map((item) =>
            item.notificationId === id ? { ...item, isCheck: true } : item
          ),
        }));
      },
    })
);