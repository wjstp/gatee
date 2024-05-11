package io.ssafy.gatee.domain.feature.entity;

import java.util.List;

public enum Type {
    PARENTS, CHILDREN, ALL;

    public static List<Type> getType(String role) {
        return switch (role) {
            case "아빠", "엄마", "할아버지", "할머니" -> List.of(PARENTS, ALL);
            case "아들", "딸" -> List.of(CHILDREN, ALL);
            default -> List.of(ALL);
        };
    }
}
