package io.ssafy.gatee.domain.push_notification.entity;

public enum Type {
    CHATTING("채팅"), NAGGING("한마디"),
    SCHEDULE("일정 등록"), APPOINTMENT("약속 등록"),
    ALBUM("사진 등록"), FEATURE("한줄 정보");

    public String korean;

    Type(String korean) {
        this.korean = korean;
    }
}
