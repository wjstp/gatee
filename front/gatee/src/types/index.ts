/* 응답타입: Res, 요청타입: Req, props타입: Props 뒤에 붙이고 사용하기 */

// member

// 가족 api 정보
export interface MemberApiReq {
  birth: string
  birthType: string;
  email: string;
  memberId: string;
  mood: string|null;
  name: string;
  nickname: string;
  role: string;
  phoneNumber: string | null;
  fileUrl: string;
  isLeader: boolean;
}

export interface MemberApiRes {
  birth: string
  birthType: string;
  email: string;
  memberId: string;
  mood: string|null;
  name: string;
  nickname: string;
  role: string;
  phoneNumber: string | null;
  fileUrl: string;
  isLeader: boolean;
  memberFamilyId:number;
}

export interface MyMemberApiRes {
  birth: string
  birthType: string;
  email: string;
  memberId: string;
  mood: string|null;
  name: string;
  nickname: string;
  role: string;
  familyId: string;
  phoneNumber: string | null;
  fileUrl: string;
  isLeader: boolean;
  memberFamilyId:number;
}

export interface CreateFamilyApiReq {
  name: string;
}

export interface Mood {
  name: string;
  mood: string;
  content: string;
}

// character
export interface Question {
  memberName: string;
  question: string;
  correctAnswer: string;
  answerList: string[];
}

export interface Character {
  question: string;
  answer: string;
}


// schedule
export interface Schedule {
  title: string | null;
  content: string | null;
  category: string | null;
  color: string | null;
  startDate: string | null;
  endDate: string | null;
  participant: string[] | [];
}

export interface Holiday {
  title: string;
  start: string;
  backgroundColor: string;
  textColor: string;
}

export interface HolidayStore {
  years: string[];
  setYears: (newYear: string[]) => void;
  holidays: Holiday[];
  setHolidays: (newSchedules: Holiday[]) => void;
}

// kakao를 전역에서 실행하기 위함
declare global {
  interface Window {
    Kakao: any;
  }
}

// kakao
export interface KaKaoLoginReq {
  grant_type: string;
  client_id: string | undefined;
  redirect_uri: string | undefined;
  code: string | null;
}

// chat
export type ChatContent = ChatMessage | ChatFile | ChatAppointment | ChatEmoji | ChatAlarm;

export interface ChatMessage {  // MESSAGE
  id: string;
  messageType: string;
  sender: string;
  currentTime: string;
  totalMember: number;
  unReadMember: string[];
  content: string;
}

export interface ChatFile { // FILE
  id: string;
  messageType: string;
  sender: string;
  currentTime: string;
  totalMember: number;
  unReadMember: string[];
  files: string[];
}

export interface ChatAppointment {  // APPOINTMENT
  id: string;
  messageType: string;
  sender: string;
  currentTime: string;
  totalMember: number;
  unReadMember: string[];
  content: string;
  participants: string[];
}

export interface ChatEmoji {  // EMOJI
  id: string;
  messageType: string;
  sender: string;
  currentTime: string;
  totalMember: number;
  unReadMember: string[];
  emojiId: string;
  content: string;
}

export interface ChatDateLine { // DATE_LINE
  id: string;
  messageType: string;
  content: string;
}

export interface ChatAlarm {  // ALARM
  id: string;
  messageType: string;
  sender: string;
  currentTime: string;
  totalMember: number;
  unReadMember: string[];
  content: string;
}

export interface ChatSendMessage {
  messageType: string;
  currentTime: string;
  content?: string;
  emojiId?: string;
  files?: string[];
}

export enum SenderType {
  YOURS = "yours",
  MY = "my"
}

export enum ChatType {
  MESSAGE = "MESSAGE",
  FILE = "FILE",
  APPOINTMENT = "APPOINTMENT",
  EMOJI = "EMOJI",
  DATE_LINE = "DATE_LINE",
  ALARM = "ALARM"
}

export interface Emoji {
  name: string;
  image: string;
  item: EmojiItem[];
}

export interface EmojiItem {
  id: string;
  image: string;
}

// 잔소리 보내기 api request
export interface NaggingApiReq {
  // 멤버 아이디
  "receiverId": string,
  "message": string
}

// photo
export interface PhotoListProps {
  editMode: string,
  photoGroup: PhotoData[],
  handleChecked: ((photoId: number, type: string) => void) | null;
}

export interface AlbumPhotoListProps {
  editMode: string,
  photoGroup: AlbumGroupDetail[],
  handleChecked: ((photoId: number, type: string) => void) | null;
}

export interface PhotoOutletInfoContext {
  editMode: string;
  handleChecked: (
    photoId: number,
    type: string,
  ) => void;
}

export interface PhotoData {
  fileId: number;
  photoId: number;
  imageUrl: string;
}

export interface AlbumGroupDetail {
  fileId: number;
  imageUrl: string;
  memberFamilyId: number;
  photoAlbumId: number;
  photoId: number;
}

// 사진 api 관련 type

export interface GroupPhotoData {
  albumId: number,
  name: string,
  imageUrl: string | null,
  PhotoId: number | null
}
export interface MonthYearThumbnailPhotoData {
  createdAt: string,
  imageUrl: string,
  photoId: number
}

export interface MonthYearPhotoTabProps {
  monthYearPhotoData: MonthYearThumbnailPhotoData
}
export interface GroupPhotoItemProps {
  groupPhotoData: GroupPhotoData
}

export interface PlusAlbumButton {
  handleModal: () => void;
}

export interface UploadPhotoApiReq {
  familyId: string,
  fileId: number | string
}

export interface GetListPhotoApiReq {
  familyId: string,
  filter: string,
  year: string | null,
  month: string | null
}

export interface UpdateAlbumNameApiReq {
  albumId: string,
  name: string
}

export interface UploadAlbumPhotoApiReq {
  albumId: string | number,
  photoIdList: number[]
}

export interface CreateAlbumApiReq {
  familyId: string,
  name: string
}

export interface FamilyIdReq {
  familyId: string,
}

export interface GetThumnailPhotoApiReq {
  familyId: string,
  filter: string
}

export interface DeletePhotoApiReq {
  photoIdList: number[]
}

// 모의고사 api 관련
export interface ExamResult {
  examId:string|number;
  score: number;
  createdAt: string;
}

export interface TransformedQuestionData {
  nickname:string,
  question: string;
  answerList: string[];
  correctNumber: number;
  choiceNumber: number;
}

export interface QuestionData {
  nickname:string;
  questionWord: string;
  wrongAnswers: string[];
  correctAnswer: string;
}

export interface ExamProblem {
  "question" : string,
  "answerList" : string[],
  "choiceNumber" : number|string,
  "correctNumber" : number|string
}

export interface SaveExamResultApiReq {
  examResults : ExamProblem[],
  score:number
}

// 백문백답 api 관련
export interface SaveAskAnswerApiReq {
  featureId:number,
  answer:string
}

export interface Answer {
  featureId:number;
  question: string;
  answer: string;
}

// 미션 api 관련
export interface Mission {
  id: number;
  type: string;
  isComplete: boolean;
  nowRange: number;
  maxRange: number;
  completedLevel: number;
};