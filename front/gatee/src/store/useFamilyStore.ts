import {create} from "zustand";
import {persist} from "zustand/middleware";
type FamilyStore = {
    familyId: string;
    setFamilyId: (newId: string) => void;
    familyName: string;
    setFamilyName: (newName: string) => void;
}

export const useFamilyStore = create<FamilyStore>()(
    persist(
    (set) => ({
        familyId: "",
        setFamilyId: (newId: string) => set({ familyId: newId }),
        familyName: "예빈이네",
        setFamilyName: (newName: string) => set({ familyName: newName }),
    }),
    {
        name: "family",
    }
)
);