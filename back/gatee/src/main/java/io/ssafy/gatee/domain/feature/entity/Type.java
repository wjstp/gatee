package io.ssafy.gatee.domain.feature.entity;

import io.ssafy.gatee.domain.member_family.entity.Role;

public enum Type {
    PARENTS, CHILDREN, ALL;

    public static Type getType(Role role) {
        return switch (role) {
            case FATHER, MOTHER, GRANDFATHER, GRANDMOTHER -> PARENTS;
            case SON, DAUGHTER -> CHILDREN;
        };
    }
}
