package io.ssafy.gatee.global.openai.util;

import lombok.Builder;

@Builder
public class Prompt {

    public static String generateQuestionPrompt(String question) {
        String strict = "미사여구를 붙이지마. 욕설이 있다면 순화해줘.";

        return String.format("%s", question, strict);
    }
}