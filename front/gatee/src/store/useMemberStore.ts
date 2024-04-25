import {create} from "zustand";
import {persist} from "zustand/middleware";
// 나중에 type 폴더로 빼야될듯
type BirthInfo = {
    birthDay: string | null;
    birthType: string;
};

type MemberStore = {
    accessToken: string | null;
    refreshToken: string | null;
    setAccessToken: (newAccessToken: string) => void;
    setRefreshToken: (newRefreshToken: string) => void;
    memberId: string | null;
    setMemberId: (newMemberId: string) => void;
    name: string | null;
    setName: (newName: string) => void;
    nickname: string | null;
    setNickName: (newNickname: string) => void;
    birth: {
        birthDay: string | null;
        birthType: string;
    };
    setBirth: (newBirth: BirthInfo) => void;
    role: string | null;
    setRoll: (newRole: string) => void;
    mood: string;
    setMood: (newMood: string) => void;
};

export const useMemberStore = create<MemberStore>()(
    persist((set)=>({
    accessToken: null,
    setAccessToken: (newAccessToken: string) => set({ accessToken: newAccessToken }),
    refreshToken: null,
    setRefreshToken: (newRefreshToken: string) => set({ refreshToken: newRefreshToken }),
    memberId: null,
    setMemberId: (newMemberId: string) => set({ memberId: newMemberId }),
    name: null,
    setName: (newName: string) => set({ name: newName }),
    nickname: null,
    setNickName: (newNickname: string) => set({ nickname: newNickname }),
    birth: {
        birthDay: null,
        birthType: "SOLAR",
    },
    setBirth: (newBirth: BirthInfo) => set({ birth: newBirth }),
    role: null,
    setRoll: (newRole: string) => set({ role: newRole }),
    mood: "default",
    setMood: (newMood: string) => set({ mood: newMood }),
        }),
        {
            name: "member",
            getStorage: () => localStorage
        }
    )
);
