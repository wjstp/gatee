package io.ssafy.gatee.domain.family.entity;


import io.ssafy.gatee.domain.base.BaseEntity;
import io.ssafy.gatee.domain.chat_room.entity.ChatRoom;
import io.ssafy.gatee.domain.file.entity.File;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("status=TRUE")
public class Family extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private Integer score;

    @ManyToOne
    @JoinColumn(name = "file_id")
    private File file;

    @OneToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    public void editFamilyName(String name) {
        this.name = name;
    }
}
