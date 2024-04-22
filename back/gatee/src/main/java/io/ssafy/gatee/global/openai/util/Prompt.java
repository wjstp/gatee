package io.ssafy.gatee.global.openai.util;

import lombok.Builder;

@Builder
public class Prompt {

    public static String generateQuestionPrompt(String question) {
        String strict = "";

        return String.format("%s", question, strict);
    }
}