import {create} from "zustand";
import {MemberApiReq} from "@type/index";

type FamilyStore = {
  familyId: string;
  setFamilyId: (newId: string) => void;
  familyName: string;
  setFamilyName: (newName: string) => void;
  familyImage: string | ArrayBuffer | null;
  setFamilyImage: (newImage: string | ArrayBuffer | null) => void;
  familyScore: number;
  setFamilyScore: (newScore: number) => void;
  familyCode: string;
  setFamilyCode: (newCode: string) => void;
  familyInfo: MemberApiReq[]|[];
  setFamilyInfo: (newInfo: MemberApiReq[]) => void;
}

export const useFamilyStore = create<FamilyStore>(
  (set) => ({
    familyId: "",
    setFamilyId: (newId: string) => set({familyId: newId}),
    familyName: "예빈이네",
    setFamilyName: (newName: string) => set({familyName: newName}),
    familyImage: null,
    setFamilyImage: (newImage: string | ArrayBuffer | null) => set({familyImage: newImage}),
    familyScore: 0,
    setFamilyScore: (newScore: number) => set({familyScore: newScore}),
    familyCode: "",
    setFamilyCode: (newCode: string) => set({familyCode: newCode}),
    familyInfo: [],
    setFamilyInfo: (newInfo: MemberApiReq[]) => set({familyInfo: newInfo}),
  })
);