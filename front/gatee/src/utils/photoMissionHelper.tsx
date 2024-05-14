// 답변 섞기
import {MissionListApiReq} from "@type/index";


// 앨범 미션 객체 찾기
export const findAlbumMission = (missions: MissionListApiReq[]) => {
  // 앨범 미션을 찾음
  const albumMission = missions.find(mission => mission.type === "ALBUM");

  return albumMission
};


export const getPossibleAmount = (mission: MissionListApiReq|undefined, amount: number) => {
  // 앨범 미션이 존재하지 않는 경우 기본값인 0을 반환
  if (mission===undefined) return 0;

  if (mission.completedLevel >= 3) return 0;
  // 앨범 미션의 maxRange와 nowRange를 사용하여 계산
  const maxAmount = mission.maxRange - mission.nowRange;
  return Math.min(maxAmount, amount)

}