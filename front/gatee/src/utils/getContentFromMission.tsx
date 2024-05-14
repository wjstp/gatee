const getContentFromMission = (type: string, completedLevel: number) => {
    if (type === "ALBUM")
      switch (completedLevel) {
        case 0:
          return "어린 시절 사진 10개 채우기"
        case 1:
          return "가족 사진 10개 채우기"
        case 2:
          return "내 앨범에 사진 10개 채우기"
        default:
          return `사진 ${(completedLevel - 2) * 10}개 채우기`
      }
    else if (type === "FEATURE") {
      return `백과사전 ${(completedLevel + 1) * 10}개 풀기`
    } else if (type === "SCHEDULE") {
      return `일정 ${(completedLevel + 1) * 3}개 잡기`
    } else if (type === "EXAM") {
      return `모의고사 ${(completedLevel + 1) * 2 + 1}회 풀기`
    }
  }
;

export default getContentFromMission;