import {Mood, Question, Emoji, ScheduleColor} from "@type/index";
import EmojiDogOne from "@assets/images/emoji/emoji_dog1.png";
import EmojiDogTwo from "@assets/images/emoji/emoji_dog2.png";
import EmojiDogThree from "@assets/images/emoji/emoji_dog3.png";
import EmojiDogFour from "@assets/images/emoji/emoji_dog4.png";
import EmojiJulOne from "@assets/images/emoji/emoji_jul1.png";
import EmojiJulTwo from "@assets/images/emoji/emoji_jul2.png";
import EmojiJulThree from "@assets/images/emoji/emoji_jul3.png";
import EmojiJulFour from "@assets/images/emoji/emoji_jul4.png";
import EmojiDogThumb from "@assets/images/emoji/emoji_dog_thumb.png";
import EmojiJulThumb from "@assets/images/emoji/emoji_jul_thumb.png";
import EmojiWhiteDogThumb from "@assets/images/emoji/emoji_white_dog_thumb.png";
import EmojiWhiteDogOne from "@assets/images/emoji/emoji_white_dog1.png";
import EmojiWhiteDogTwo from "@assets/images/emoji/emoji_white_dog2.png";
import EmojiWhiteDogThree from "@assets/images/emoji/emoji_white_dog3.png";
import EmojiWhiteDogFour from "@assets/images/emoji/emoji_white_dog4.png";
import EmojiBrownDogThumb from "@assets/images/emoji/emoji_brown_dog_thumb.png";
import EmojiBrownDogOne from "@assets/images/emoji/emoji_brown_dog1.png";
import EmojiBrownDogTwo from "@assets/images/emoji/emoji_brown_dog2.png";
import EmojiBrownDogThree from "@assets/images/emoji/emoji_brown_dog3.png";
import EmojiBrownDogFour from "@assets/images/emoji/emoji_brown_dog4.png";
import EmojiBlackDogThumb from "@assets/images/emoji/emoji_black_dog_thumb.png";
import EmojiBlackDogOne from "@assets/images/emoji/emoji_black_dog1.png";
import EmojiBlackDogTwo from "@assets/images/emoji/emoji_black_dog2.png";
import EmojiBlackDogThree from "@assets/images/emoji/emoji_black_dog3.png";
import EmojiBlackDogFour from "@assets/images/emoji/emoji_black_dog4.png";
import ScheduleIconBlue from "@assets/images/schedule/ic_calendar_blue.png";
import ScheduleIconGray from "@assets/images/schedule/ic_calendar_gray.png";
import ScheduleIconGreen from "@assets/images/schedule/ic_calendar_green.png";
import ScheduleIconMint from "@assets/images/schedule/ic_calendar_mint.png";
import ScheduleIconNavy from "@assets/images/schedule/ic_calendar_navy.png";
import ScheduleIconOrange from "@assets/images/schedule/ic_calendar_orange.png";
import ScheduleIconPink from "@assets/images/schedule/ic_calendar_pink.png";
import ScheduleIconPurple from "@assets/images/schedule/ic_calendar_purple.png";
import ScheduleIconRed from "@assets/images/schedule/ic_calendar_red.png";
import ScheduleIconYellow from "@assets/images/schedule/ic_calendar_yellow.png";

/* 대문자로 작성 */

// 이모티콘
export const EMOJI: Emoji[] = [
  {
    name: "dog",
    image: EmojiDogThumb,
    item: [
      { id: "dog1", image: EmojiDogOne },
      { id: "dog2", image: EmojiDogTwo },
      { id: "dog3", image: EmojiDogThree },
      { id: "dog4", image: EmojiDogFour },
    ]
  },
  {
    name: "white_dog",
    image: EmojiWhiteDogThumb,
    item: [
      { id: "white_dog1", image: EmojiWhiteDogOne },
      { id: "white_dog2", image: EmojiWhiteDogTwo },
      { id: "white_dog3", image: EmojiWhiteDogThree },
      { id: "white_dog4", image: EmojiWhiteDogFour },
    ]
  },
  {
    name: "black_dog",
    image: EmojiBlackDogThumb,
    item: [
      { id: "black_dog1", image: EmojiBlackDogOne },
      { id: "black_dog2", image: EmojiBlackDogTwo },
      { id: "black_dog3", image: EmojiBlackDogThree },
      { id: "black_dog4", image: EmojiBlackDogFour },
    ]
  },
  {
    name: "brown_dog",
    image: EmojiBrownDogThumb,
    item: [
      { id: "brown_dog1", image: EmojiBrownDogOne },
      { id: "brown_dog2", image: EmojiBrownDogTwo },
      { id: "brown_dog3", image: EmojiBrownDogThree },
      { id: "brown_dog4", image: EmojiBrownDogFour },
    ]
  },
  {
    name: "jul",
    image: EmojiJulThumb,
    item: [
      { id: "jul1", image: EmojiJulOne },
      { id: "jul2", image: EmojiJulTwo },
      { id: "jul3", image: EmojiJulThree },
      { id: "jul4", image: EmojiJulFour },
    ]
  },
];

// 기분
export const MOOD: Mood[] = [
  { name: "HAPPY", mood: "🥰", content: "행복해요"},
  { name: "SAD", mood: "😥", content: "슬퍼요" },
  { name: "ALONE", mood: "😑", content: "혼자 있고 싶어요" },
  { name: "ANGRY", mood: "🤬", content: "화나요" },
  { name: "FEAR", mood: "😱", content: "심란해요" },
  {name: "SLEEPY", mood: "😪", content: "피곤해요" },
]

// 일정 색상표
export const SCHEDULE_COLOR: ScheduleColor[] = [
  {name: "red", code: "#ffbbbb",  image: ScheduleIconRed},
  {name: "orange", code: "#ffd291",  image: ScheduleIconOrange},
  {name: "yellow", code: "#ffef98",  image: ScheduleIconYellow},
  {name: "green", code: "#caffb7",  image: ScheduleIconGreen},
  {name: "blue", code: "#bbdbff",  image: ScheduleIconBlue},
  {name: "navy", code: "#aeb8ff",  image: ScheduleIconNavy},
  {name: "purple", code: "#d9c8ff",  image: ScheduleIconPurple},
  {name: "mint", code: "#a8fadb",  image: ScheduleIconMint},
  {name: "pink", code: "#ffc3eb",  image: ScheduleIconPink},
  {name: "gray", code: "#bfbfbf",  image: ScheduleIconGray},
]


// 모의고사 임시 데이터
export const QuestionSample: Question[] = [
  {
    memberName: "윤예빈",
    question: "님이 좋아하는 음식은 무엇인가요?",
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

export const questionList = [
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
]

export const transformedExamList = [
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 3,
    correctNumber: 3,
    question: "문제"
  },
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 2,
    correctNumber: 3,
    question: "문제"
  },
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 1,
    correctNumber: 3,
    question: "문제"
  },
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 4,
    correctNumber: 3,
    question: "문제"
  },
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 1,
    correctNumber: 3,
    question: "문제"
  },
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 2,
    correctNumber: 2,
    question: "문제"
  },
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 1,
    correctNumber: 3,
    question: "문제"
  },
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 5,
    correctNumber: 3,
    question: "문제"
  },
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 2,
    correctNumber: 3,
    question: "문제"
  },
  {
    nickname:"수지",
    answerList: ['틀린 문장', '틀린 문장', '정답 문장', '틀린 문장'],
    choiceNumber: 1,
    correctNumber: 3,
    question: "문제"
  }
]