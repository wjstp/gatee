package io.ssafy.gatee.domain.photo_group.entity;

import io.ssafy.gatee.domain.group.entity.Group;
import io.ssafy.gatee.domain.photo.entity.Photo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhotoGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "photo_id")
    private Photo photo;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
}
