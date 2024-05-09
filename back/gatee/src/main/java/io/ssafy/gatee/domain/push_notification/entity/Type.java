package io.ssafy.gatee.domain.push_notification.entity;

public enum Type {
    CHATTING("채팅"), NAGGING("한마디 하기"),
    SCHEDULE("일정 등록"), APPOINTMENT("약속 잡기"), ALBUM("앨범 등록");

    public String korean;
    Type(String korean) {
        this.korean = korean;
    }
}
