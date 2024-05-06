package io.ssafy.gatee.global.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Getter
@Builder
public final class FireStoreChatDto {
    private final MessageType messageType;
    private final String content;
    private final String sender;
    private final Integer totalMember;
    private final List<String> unReadMember;

//    public FireStoreChatDto(
//            MessageType messageType,
//            String content,
//            String sender,
//            Integer totalMember,
//            List<String> unReadMember
//    ) {
//        this.messageType = messageType;
//        this.content = content;
//        this.sender = sender;
//        this.totalMember = totalMember;
//        this.unReadMember = unReadMember;
//    }
//
//    public MessageType messageType() {
//        return messageType;
//    }
//
//    public String content() {
//        return content;
//    }
//
//    public String sender() {
//        return sender;
//    }
//
//    public Integer totalMember() {
//        return totalMember;
//    }
//
//    public List<String> unReadMember() {
//        return unReadMember;
//    }
//
//    @Override
//    public boolean equals(Object obj) {
//        if (obj == this) return true;
//        if (obj == null || obj.getClass() != this.getClass()) return false;
//        var that = (FireStoreChatDto) obj;
//        return Objects.equals(this.messageType, that.messageType) &&
//                Objects.equals(this.content, that.content) &&
//                Objects.equals(this.sender, that.sender) &&
//                Objects.equals(this.totalMember, that.totalMember) &&
//                Objects.equals(this.unReadMember, that.unReadMember);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(messageType, content, sender, totalMember, unReadMember);
//    }
//
//    @Override
//    public String toString() {
//        return "FireStoreChatDto[" +
//                "messageType=" + messageType + ", " +
//                "content=" + content + ", " +
//                "sender=" + sender + ", " +
//                "totalMember=" + totalMember + ", " +
//                "unReadMember=" + unReadMember + ']';
//    }

}
