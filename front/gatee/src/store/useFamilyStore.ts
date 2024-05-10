import { create } from "zustand";
import basicFamily from "@assets/images/profile/family.jpg"
import { MemberApiReq } from "@type/index";

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
  familyScore: number;
  setFamilyScore: (newScore: number) => void;
  familyInfo: MemberApiReq[]|[];
  setFamilyInfo: (newInfo: MemberApiReq[]) => void;
}

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
    setFamilyInfo: (newInfo: MemberApiReq[]) => set({familyInfo: newInfo}),
  })
);