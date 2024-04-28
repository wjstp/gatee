export interface Member {
    nickname: string;
    email: string;
    role: string;
    birth: string;
    birthType: string;
    image: string;
    mood: string | null;
}

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