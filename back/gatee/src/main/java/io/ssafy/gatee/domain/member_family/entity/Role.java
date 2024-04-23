package io.ssafy.gatee.domain.member_family.entity;

public enum Role {
    MOTHER("엄마"), FATHER("아빠"), SON("아들"), DAUGHTER("딸");

    private final String korean;

    Role(String korean) {
        this.korean = korean;
    }
}
