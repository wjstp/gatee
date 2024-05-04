package io.ssafy.gatee.global.openai.util;

import lombok.Builder;

@Builder
public class Prompt {

    public static String generateQuestionPrompt(String question) {
        String strict =
                "\"최근 가장 행복했던 순간이 언제인가요?\"에 대해 \"어린이날 \"이라고 답했고, " +
                "이를 객관식 문제로 낼 때 선지에 있을 만한 것들을 Python의 리스트 형태로 choices라는 변수에 담아서 말해줘. " +
                "미사 여구 없이 choices만 답해 \n" +
                "객관식 문제에 낼 떄 선지에 있을만한 것들의 조건은 다음과 같아\n" +
                "1. 비슷한 길이의 단어나 문장\n" +
                "2. 같은 범주의 단어나 문장";

        return String.format("%s", question, strict);
    }
}