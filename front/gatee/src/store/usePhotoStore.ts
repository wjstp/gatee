import {create} from "zustand";
import {persist} from "zustand/middleware";

type PhotoStore = {
  isEdit: boolean;
  setIsEdit: (newId: boolean) => void;
}

export const usePhotoStore = create<PhotoStore>()(
  persist(
    (set) => ({
      isEdit: false,
      setIsEdit: (newId: boolean) => set({ isEdit: newId }),
    }),
    {
      name: "photo",
    }
  )
);