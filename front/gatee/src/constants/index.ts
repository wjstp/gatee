import {
  Member,
  Mood,
  Question,
  Schedule,
  ChatMessage,
  Emoji,
  ChatFile,
  ChatAppointment,
  ChatEmoji,
  ChatDateLine,
  ChatAlarm
} from "@type/index";
import EmojiDogOne from "@assets/images/emoji/emoji_dog1.png";
import EmojiDogTwo from "@assets/images/emoji/emoji_dog2.png";
import EmojiDogThree from "@assets/images/emoji/emoji_dog3.png";
import EmojiDogFour from "@assets/images/emoji/emoji_dog4.png";
import EmojiJulOne from "@assets/images/emoji/emoji_jul1.png";
import EmojiJulTwo from "@assets/images/emoji/emoji_jul2.png";
import EmojiJulThree from "@assets/images/emoji/emoji_jul3.png";
import EmojiJulFour from "@assets/images/emoji/emoji_jul4.png";
import EmojiDogThum from "@assets/images/emoji/emoji_dog_thum.png";
import EmojiJulThum from "@assets/images/emoji/emoji_jul_thum.png";

/* 대문자로 작성 */

// 이모티콘
export const EMOJI: Emoji[] = [
  {
    name: "dog",
    image: EmojiDogThum,
    item: [
      { id: "dog1", image: EmojiDogOne },
      { id: "dog2", image: EmojiDogTwo },
      { id: "dog3", image: EmojiDogThree },
      { id: "dog4", image: EmojiDogFour },
    ]
  },
  {
    name: "jul",
    image: EmojiJulThum,
    item: [
      { id: "jul1", image: EmojiJulOne },
      { id: "jul2", image: EmojiJulTwo },
      { id: "jul3", image: EmojiJulThree },
      { id: "jul4", image: EmojiJulFour },
    ]
  }
];

// 파일 제한 사항
const ALLOW_FILE_EXTENSION: string = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT: number = 5 * 1024 * 1024;

// 기분
export const MOOD: Mood[] = [
  { name: "HAPPY", mood: "🥰", content: "행복해요"},
  { name: "SAD", mood: "😥", content: "슬퍼요" },
  { name: "ALONE", mood: "😑", content: "혼자 있고 싶어요" },
  { name: "ANGRY", mood: "🤬", content: "화나요" },
  { name: "FEAR", mood: "😱", content: "심란해요" },
  {name: "SLEEPY", mood: "😪", content: "피곤해요" },
]

// 멤버 임시 데이터
export const MemberInfoSample: Member = {
  name: "이윤정",
  nickname: "안유진",
  email: "zyo0720@kakao.com",
  role: "딸",
  birth: "2000-07-20",
  birthType: "SOLAR",
  image: "https://cdn.citytimes.co.kr/news/photo/202310/mn_19685_20231014093033_1.jpg",
  mood: "HAPPY",
  phoneNumber: "010-8806-8489"
}

// 가족 구성원 임시 데이터
export const FamilyMemberInfoSample: Member[] = [
  {
    name: "이윤정",
    nickname: "이윤정",
    email: "zyo0720@kakao.com",
    role: "딸",
    birth: "2000-07-20",
    birthType: "SOLAR",
    image: "https://image.xportsnews.com/contents/images/upload/article/2023/1013/mb_1697156860596868.jpg",
    mood: null,
    phoneNumber: "010-8806-8489"
  },
  {
    name: "이윤정",
    nickname: "윤예빈",
    email: "yebin4684@gmail.com",
    role: "엄마",
    birth: "1999-11-03",
    birthType: "SOLAR",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW4C8mlEPUiWYuROJ0llF7eFg9Bs9TtMqV8KfdxLV-hg&s",
    mood: "HAPPY",
    phoneNumber: "010-8806-8489"
  },
  {
    name: "이윤정",
    nickname: "전세진",
    email: "wjstp14@gmail.com",
    role: "아빠",
    birth: "1998-02-14",
    birthType: "SOLAR",
    image: "https://image.newdaily.co.kr/site/data/img/2023/09/15/2023091500117_2.jpg",
    mood: "",
    phoneNumber: "010-8806-8489"
  },
  {
    name: "이윤정",
    nickname: "김태현",
    email: "asthyeon@gmail.com",
    role: "할머니",
    birth: "1994-03-04",
    birthType: "SOLAR",
    image: "https://yt3.googleusercontent.com/QBR8DJ3RJIgjrnsye7IPBDXAYkIK3G-rNolklMPlq7ndsXg4sWWVcS8oHVPrfyt7ApQ3BzNnVMQ=s900-c-k-c0x00ffffff-no-rj",
    mood: "HAPPY",
    phoneNumber: ""
  },
  {
    name: "이윤정",
    nickname: "배정식",
    email: "megar0829@gmail.com",
    role: "아들",
    birth: "1997-08-29",
    birthType: "SOLAR",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkaX7TOkcE7W_5R0WXYy8N5Dbh-fcI23Dy7_g6HFREWw&s",
    mood: "ALONE",
    phoneNumber: "",
  },
  {
    name: "이윤정",
    nickname: "이형우",
    email: "dlguddn3024@gmail.com",
    role: "할아버지",
    birth: "1994-06-22",
    birthType: "SOLAR",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0cTfgWus0RScvjQpx8zAGe-F0-U0W2s960N2AZmfPSA&s",
    mood: "ANGRY",
    phoneNumber: ""
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
    src: 'https://i.pinimg.com/564x/8b/a2/83/8ba283897b9ad414c929ca1a8630b4bd.jpg',
  },
  {
    id: 2,
    dateTime: "2024-01-31T12:00:00",
    src: 'https://i.pinimg.com/564x/d0/8c/14/d08c14ed55d5ac1429e6ccf7fe403ad4.jpg',
  },

  {
    id: 3,
    dateTime: "2024-01-31T12:00:00",
    src: 'https://i.pinimg.com/564x/a6/20/b6/a620b6da690371e66d9aadaf4e491d4b.jpg',
  },
  {
    id: 3,
    dateTime: "2024-01-31T12:00:00",
    src: 'https://i.pinimg.com/564x/5c/84/85/5c8485d98e717cf157184c38ea3816cb.jpg',
  },
  {
    id: 4,
    dateTime: "2024-01-31T12:00:00",
    src: 'https://i.pinimg.com/736x/c5/04/ce/c504ce97f611b279f88b30858e19dd0a.jpg',
  },
  {
    id: 5,
    dateTime: "2024-01-31T12:00:00",
    src: 'https://i.pinimg.com/736x/1a/24/64/1a2464d891d0b8ef10a6b7e0eddd444a.jpg',
  },
  {
    id: 6,
    dateTime: "2024-01-31T12:00:00",
    src: 'https://i.pinimg.com/736x/0d/d2/4c/0dd24cbca2f3b73d7e30df8043310c11.jpg',
  },
]

// 일정 임시 데이터
export const ScheduleSample: Schedule[] = [
  {
    title: "단체 일정",
    content: "단체 일정입니다.",
    category: "group",
    color: "pink",
    startDate: "2024-05-01T00:00",
    endDate: "2024-05-01T23:59",
    participant: ["zyo0720@kakao.com", "yebin4684@gmail.com", "wjstp14@gmail.com"]
  },
  {
    title: "개인 일정",
    content: "개인 일정입니다.",
    category: "personal",
    color: "blue",
    startDate: "2024-05-01T00:00",
    endDate: "2024-05-01T23:59",
    participant: ["zyo0720@kakao.com"]
  },
  {
    title: "이벤트",
    content: "이벤트입니다.",
    category: "event",
    color: "purple",
    startDate: "2024-05-01T00:00",
    endDate: "2024-05-01T23:59",
    participant: []
  }
]

// 채팅 임시 데이터
export const ChatSample: (ChatMessage |  ChatFile | ChatAppointment | ChatEmoji | ChatDateLine | ChatAlarm)[] = [
  {
    messageType: "ALARM",
    sender: "megar0829@gmail.com",
    time: "2024-05-02T23:50:00",
    totalMember: 6,
    unreadMember: ["megar0829@gmail.com"],
    content: "띡이랑 놀 사람",
  },
  {
    messageType: "APPOINTMENT",
    sender: "asthyeon@gmail.com",
    time: "2024-05-02T02:50:00",
    totalMember: 6,
    unreadMember: ["megar0829@gmail.com"],
    participants: ["asthyeon@gmail.com"],
    content: "추억 회상할 사람"
  },
  {
    messageType: "APPOINTMENT",
    sender: "zyo0720@kakao.com",
    time: "2024-05-02T02:40:00",
    totalMember: 6,
    unreadMember: ["megar0829@gmail.com"],
    participants: ["zyo0720@kakao.com", "yebin4684@gmail.com"],
    content: "저녁 같이 먹을 사람"
  },
  {
    messageType: "FILE",
    sender: "asthyeon@gmail.com",
    time: "2024-05-02T02:30:00",
    totalMember: 6,
    unreadMember: ["megar0829@gmail.com"],
    files: [
      "https://i.pinimg.com/736x/39/48/76/394876e0e2129f959bd910b65da6f3f8.jpg",
      "https://i.pinimg.com/736x/39/48/76/394876e0e2129f959bd910b65da6f3f8.jpg",
      "https://i.pinimg.com/736x/39/48/76/394876e0e2129f959bd910b65da6f3f8.jpg",
      "https://i.pinimg.com/736x/39/48/76/394876e0e2129f959bd910b65da6f3f8.jpg"
    ],
  },
  {
    messageType: "FILE",
    sender: "wjstp14@gmail.com",
    time: "2024-05-02T02:20:00",
    totalMember: 6,
    unreadMember: ["megar0829@gmail.com"],
    files: ["https://i.pinimg.com/564x/8b/a2/83/8ba283897b9ad414c929ca1a8630b4bd.jpg"],
  },
  {
    messageType: "MESSAGE",
    sender: "zyo0720@kakao.com",
    time: "2024-05-02T02:10:00",
    totalMember: 6,
    unreadMember: ["megar0829@gmail.com"],
    content: "그러니까",
  },
  {
    messageType: "MESSAGE",
    sender: "yebin4684@gmail.com",
    time: "2024-05-02T01:00:00",
    totalMember: 6,
    unreadMember: ["megar0829@gmail.com"],
    content: ";;",
  },
  {
    messageType: "MESSAGE",
    sender: "yebin4684@gmail.com",
    time: "2024-05-02T01:00:00",
    totalMember: 6,
    unreadMember: ["megar0829@gmail.com"],
    content: "뭐야 저 사람",
  },
  {
    messageType: "EMOJI",
    sender: "megar0829@gmail.com",
    time: "2024-05-02T00:00:00",
    totalMember: 6,
    unreadMember: [],
    content: "띡이 삐딤.",
    emojiId: "dog4"
  },
  {
    messageType: "DATE_LINE",
    time: "2024-05-02T00:00:00",
  },
]