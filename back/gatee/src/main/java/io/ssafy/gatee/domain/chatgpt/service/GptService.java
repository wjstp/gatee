package io.ssafy.gatee.domain.chatgpt.service;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;
import io.ssafy.gatee.domain.chatgpt.dto.request.QuestionDto;
import io.ssafy.gatee.domain.chatgpt.dto.response.GptResponseDto;
import io.ssafy.gatee.global.exception.error.service_unavailable.GptServiceUnavailable;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
import io.ssafy.gatee.global.openai.config.ChatGptConfig;
import io.ssafy.gatee.global.openai.util.Prompt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GptService {

    private final OpenAiService openAiService;

    public ChatCompletionResult generated(List<ChatMessage> chatMessages) {
        try {
            ChatCompletionRequest build = ChatCompletionRequest.builder()
                    .messages(chatMessages)
                    .model(ChatGptConfig.MODEL)
                    .maxTokens(ChatGptConfig.MAX_TOKEN)
                    .temperature(ChatGptConfig.TEMPERATURE)
                    .topP(ChatGptConfig.TOP_P)
                    .build();

            return openAiService.createChatCompletion(build);
        } catch (RuntimeException e) {
            throw new GptServiceUnavailable(ExceptionMessage.GPT_SERVICE_UNAVAILABLE);
        }
    }

    public List<ChatMessage> generatedQuestionAndAnswerMessage(QuestionDto questionDto) {
        String prompt = Prompt.generateQuestionPrompt(questionDto.content());
        ChatMessage chatMessage = new ChatMessage(ChatMessageRole.USER.value(), prompt);

        return List.of(chatMessage);
    }

    public GptResponseDto askQuestion(QuestionDto questionDto) {
        List<ChatMessage> chatMessages = generatedQuestionAndAnswerMessage(questionDto);
        ChatCompletionResult result = generated(chatMessages);

        String gptAnswer = result.getChoices().get(0).getMessage().getContent();
        return GptResponseDto.builder()
                .answer(gptAnswer)
                .build();
    }
}