import {create} from "zustand";
import {MissionListApiReq} from "@type/index";

interface MissionStore {
  missionList: MissionListApiReq[],
  setMissionList: (newMissionList: MissionListApiReq[]) => void,
  increaseMissionRange: (type: string, amount: number) => void;
}


export const useMissionStore = create<MissionStore>(
  (set) => ({
    missionList: [],
    setMissionList: (newMissionList: MissionListApiReq[]) => set({missionList: newMissionList}),
    increaseMissionRange: (type: string, amount: number) => {
      set((state) => ({
        missionList: state.missionList.map(mission => {
          if (mission.type === type) {
            return {
              ...mission,
              nowRange: mission.nowRange + amount
            };
          } else {
            return mission;
          }
        })
      }));
  }})
);