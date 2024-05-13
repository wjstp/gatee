import { create } from "zustand";
import basicFamily from "@assets/images/profile/family.jpg"
import { MemberApiRes, FamilyStore } from "@type/index";

export const useFamilyStore = create<FamilyStore>(
  (set) => ({
    familyId: "",
    setFamilyId: (newId: string) => set({familyId: newId}),
    familyName: "",
    setFamilyName: (newName: string) => set({familyName: newName}),
    familyImage: null,
    setFamilyImage: (newImage: File | null) => set({familyImage: newImage}),
    stringImage: basicFamily,
    setStringImage: (newStringImage: string) => set({stringImage: newStringImage}),
    familyScore: 0,
    setFamilyScore: (newScore: number) => set({familyScore: newScore}),
    familyCode: "",
    setFamilyCode: (newCode: string) => set({familyCode: newCode}),
    familyInfo: [],
    setFamilyInfo: (newInfo: MemberApiRes[]) => set({familyInfo: newInfo}),
  })
);