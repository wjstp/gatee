import {Member, Question, Character} from "src/types";

export const API_URL: string = "https://gaty.duckdns.org";

// 멤버 임시 데이터
export const MemberInfoSample: Member = {
  nickname: "이윤정",
  email: "zyo0720@kakao.com",
  role: "딸",
  birth: "2000-07-20",
  birthType: "SOLAR",
  image: "",
  mood: null
}

// 가족 구성원 임시 데이터
export const FamilyMemberInfoSample: Member[] = [
  {
    nickname: "윤예빈",
    email: "yebin4684@gmail.com",
    role: "엄마",
    birth: "1999-11-03",
    birthType: "SOLAR",
    image: "",
    mood: "HAPPY"
  },
  {
    nickname: "전세진",
    email: "wjstp14@gmail.com",
    role: "아빠",
    birth: "1998-02-14",
    birthType: "SOLAR",
    image: "",
    mood: "SAD"
  },
  {
    nickname: "김태현",
    email: "asthyeon@gmail.com",
    role: "할머니",
    birth: "1994-03-04",
    birthType: "SOLAR",
    image: "",
    mood: "HAPPY"
  },
  {
    nickname: "배정식",
    email: "megar0829@gmail.com",
    role: "아들",
    birth: "1997-08-29",
    birthType: "SOLAR",
    image: "",
    mood: "ALONE"
  },
  {
    nickname: "이형우",
    email: "dlguddn3024@gmail.com",
    role: "할아버지",
    birth: "1994-06-22",
    birthType: "SOLAR",
    image: "",
    mood: "ANGRY"
  }
]

// 백과사전 임시 데이터
export const CharacterSample: Character[] = [
  {
    question: "못 먹는 음식은",
    answer: "피망"
  },
  {
    question: "부모님이 가장 보고 싶을 때는",
    answer: "맛있는 거 먹을 때"
  },
  {
    question: "올해 꼭 하고 싶은 일은",
    answer: "혼자 해외여행 가기"
  },
  {
    question: "인생에서 가장 후회되는 일은",
    answer: "학점 관리 안 한 것"
  }
]

// 모의고사 임시 데이터
export const QuestionSample: Question[] = [
  {
    memberName: "윤예빈",
    question: "좋아하는 음식은 무엇인가요?",
    correctAnswer: "삼겹살",
    answerList: ["삼겹살", "마라탕", "곱창", "코딱지"],
  },
  {
    memberName: "이형우",
    question: "발 사이즈는 몇인가요?",
    correctAnswer: "290",
    answerList: ["250", "270", "290", "310"],
  },
  {
    memberName: "전세진",
    question: "생일은 언제인가요?",
    correctAnswer: "1998-02-14",
    answerList: ["1998-02-20", "1998-02-24", "1998-02-22", "1997-02-20"],
  },
  {
    memberName: "김태현",
    question: "발 냄새가 어떤가요?",
    correctAnswer: "꽃 향기가 난다",
    answerList: ["끔찍하다", "꽃 향기가 난다", "된장 냄새가 난다", "아무 냄새도 안 난다"],
  },
  {
    memberName: "배정식",
    question: "별명이 무엇인가요?",
    correctAnswer: "띡",
    answerList: ["띡", "띱", "뚝", "띠발"],
  },
  {
    memberName: "윤예빈",
    question: "좋아하는 동물은 무엇인가요?",
    correctAnswer: "강아지",
    answerList: ["강아지", "원숭이", "코뿔소", "윤정이"],
  },
  {
    memberName: "윤예빈",
    question: "좋아하는 음식은?",
    correctAnswer: "삼겹살",
    answerList: ["삼겹살", "마라탕", "곱창", "코딱지"],
  },
  {
    memberName: "전세진",
    question: "하루 중 가장 행복한 때는 언제인가요?",
    correctAnswer: "마라탕 먹을 때",
    answerList: ["코딩할 때", "응가할 때", "운동할 때", "마라탕 먹을 때"],
  },
  {
    memberName: "김태현",
    question: "어릴 때 꿈이 무엇인가요?",
    correctAnswer: "백만장자",
    answerList: ["거지", "교사", "우주비행사", "백만장자"],
  },
  {
    memberName: "이형우",
    question: "가장 힘들 때가 언제였나요?",
    correctAnswer: "여자 친구와 헤어졌을 때",
    answerList: ["여자 친구와 헤어졌을 때", "밥 먹을 때", "지하철 탈 때", "코딩할 때"],
  }
]


// 사진 임시 데이터
export const photoGroup = [
  {
    id: 1,
    dateTime: "2024-01-31T12:00:00",
    src: '@assets/images/schedule/calendarBanner3.jpg',
  },
  {
    id: 2,
    dateTime: "2024-01-31T12:00:00",
    src: '@assets/images/schedule/calendarBanner3.jpg',
  },

  {
    id: 3,
    dateTime: "2024-01-31T12:00:00",
    src: '@assets/images/schedule/calendarBanner3.jpg',
  },
  {
    id: 3,
    dateTime: "2024-01-31T12:00:00",
    src: '@assets/images/schedule/calendarBanner3.jpg',
  },
  {
    id: 4,
    dateTime: "2024-01-31T12:00:00",
    src: '@assets/images/schedule/calendarBanner3.jpg',
  },
  {
    id: 5,
    dateTime: "2024-01-31T12:00:00",
    src: '@assets/images/schedule/calendarBanner3.jpg',
  },
  {
    id: 6,
    dateTime: "2024-01-31T12:00:00",
    src: '@assets/images/schedule/calendarBanner3.jpg',
  },

]