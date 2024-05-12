/* 응답타입: Res, 요청타입: Req, props타입: Props 뒤에 붙이고 사용하기 */

// 가족
export interface FamilyStore {
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
  familyInfo: MemberApiRes[];
  setFamilyInfo: (newInfo: MemberApiRes[]) => void;
}

// 멤버
export interface MemberStore {
  memberId: string | null;
  setMemberId: (newMemberId: string) => void;
  name: string;
  setName: (newName: string) => void;
  nickname: string | null;
  setNickName: (newNickname: string) => void;
  birth: string | null;
  setBirth: (newBirth: string) => void;
  birthType: string;
  setBirthType: (newBirthType: string) => void;
  role: string | null;
  setRole: (newRole: string | null) => void;
  mood: string;
  setMood: (newMood: string) => void;
  phoneNumber: string;
  setPhoneNumber: (newPhoneNumber: string) => void;
  gender: string;
  setGender: (newGender: string) => void;
  memberImage: File | null
  setMemberImage: (newImage: File | null) => void;
  stringMemberImage: string;
  setStringMemberImage: (newStringMemberImage: string) => void;
  myInfo : MyMemberApiReq;
  setMyInfo: (newMyInfo: Partial<MyMemberApiReq>) => void;
};

// member
export interface Member {
  name: string;
  nickname: string;
  email: string;
  role: string;
  birth: string;
  birthType: string;
  fileUrl: string;
  mood: string | null;
  phoneNumber: string | null;
}

// 멤버 create api 정보
export interface CreateMemberApiReq {
  name: string,
  nickname: string,
  birth: string,
  birthType: string,
  role: string,
  familyId: string,
  phoneNumber: string | null,
}

// 가족 api 정보
export interface MyMemberApiReq {
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

// 가족 코드 생성
export interface CreateFamilyCodeApiReq {
  familyId: string;
}

// 가족 합류
export interface JoinFamilyApiReq {
  familyCode: string;
}

// 가족 정보 조회
export interface GetFamilyMemberApiReq {
  familyId: string
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
  messageType: string;
  sender: string;
  time: string;
  totalMember: number;
  unreadMember: string[];
  content: string;
}

export interface ChatFile { // FILE
  messageType: string;
  sender: string;
  time: string;
  totalMember: number;
  unreadMember: string[];
  files: string[];
}

export interface ChatAppointment {  // APPOINTMENT
  messageType: string;
  sender: string;
  time: string;
  totalMember: number;
  unreadMember: string[];
  content: string;
  participants: string[];
}

export interface ChatEmoji {  // EMOJI
  messageType: string;
  sender: string;
  time: string;
  totalMember: number;
  unreadMember: string[];
  emojiId: string;
  content: string;
}

export interface ChatDateLine { // DATE_LINE
  messageType: string;
  time: string;
}

export interface ChatAlarm {  // ALARM
  messageType: string;
  sender: string;
  time: string;
  totalMember: number;
  unreadMember: string[];
  content: string;
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
  score: number;
  createdAt: string;
}

export interface TransformedQuestionData {
  question: string;
  answerList: string[];
  correctNumber: number;
  choiceNumber: number;
}

export interface QuestionData {
  question: string;
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
