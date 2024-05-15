// 답변 섞기
import {QuestionData, TransformedQuestionData} from "@type/index";

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// 질문 데이터 구조 변경
export const transformQuestionData = (data: QuestionData[]): {
  transformedData: TransformedQuestionData[],
  answerNumArray: number[]
} => {
  const transformedData: TransformedQuestionData[] = [];
  const answerNumArray: number[] = [];

  data.forEach((question) => {
    // let wrongAnswers = question.wrongAnswers
    // if (question.wrongAnswers.length === 1){
    //   wrongAnswers =question.wrongAnswers[0].split(",")
    // }
    const answerList = shuffleArray([...question.wrongAnswers, question.correctAnswer]);
    const correctNumber = answerList.findIndex(answer => answer === question.correctAnswer) + 1;

    transformedData.push({
      nickname: question.nickname,
      question: question.questionWord,
      answerList,
      correctNumber,
      choiceNumber: 0
    });

    answerNumArray.push(correctNumber);
  });

  return {transformedData, answerNumArray};
};

// 채점하기
export const getExamScore = (myAnswerList: number[], correctAnswerSheet: number[]): number => {
  // 두 배열의 길이가 다르면 일치하는 원소의 개수는 0이므로 바로 반환
  if (myAnswerList.length !== correctAnswerSheet.length) {
    return 0;
  }

  let count = 0;
  for (let i = 0; i < myAnswerList.length; i++) {
    // 두 배열에서 같은 위치의 원소가 같으면 count를 증가시킴
    if (myAnswerList[i] === correctAnswerSheet[i]) {
      count++;
    }
  }
  return count * 10;
};

// 해당 인덱스에 답 저장 함수
export const setAnswerAtIndex = (index: number, value: number, answerList: number[]) => {
  if (index >= 0 && index < answerList.length) {
    const updatedAnswerList = [...answerList];
    updatedAnswerList[index] = value;
    return updatedAnswerList;
  }
  return answerList; // 인덱스가 범위를 벗어나면 원본 배열 반환
};

// 정답 안고른 문제 인덱스 보여주기
export const unSelectedIndex = (myAnswerSheet: number[])=>{
  let unselectedIndex:number[] = []
  myAnswerSheet.forEach((item,index)=>{
    if (item===0) {
      unselectedIndex.push(index+1);
    }
  })
  return unselectedIndex;
}