import { create } from "zustand";
import basicFamily from "@assets/images/profile/family.jpg"

type FamilyStore = {
    familyId: string;
    setFamilyId: (newId: string) => void;
    familyName: string;
    setFamilyName: (newName: string) => void;
    familyImage: File | null;
    setFamilyImage: (newImage: File | null) => void;
    stringImage: string;
    setStringImage: (newStringImage: string) => void;
    familyCode: string;
    setFamilyCode: (newCode: string) => void;
}

export const useFamilyStore = create<FamilyStore>(
  (set) => ({
    familyId: "",
    setFamilyId: (newId: string) => set({ familyId: newId }),
    familyName: "",
    setFamilyName: (newName: string) => set({ familyName: newName }),
    familyImage: null,
    setFamilyImage: (newImage: File | null) => set({familyImage: newImage}),
    stringImage: basicFamily,
    setStringImage: (newStringImage: string) => set({stringImage: newStringImage}),
    familyCode: "",
    setFamilyCode: (newCode: string) => set({ familyCode: newCode }),
  })
);