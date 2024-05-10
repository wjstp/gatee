package io.ssafy.gatee.domain.member_family.entity;

public enum Role {
    MOTHER("엄마"), FATHER("아빠"), SON("아들"), DAUGHTER("딸"),
    GRANDMOTHER("할머니"), GRANDFATHER("할아버지")
    ;

    public final String korean;

    Role(String korean) {
        this.korean = korean;
    }
}
