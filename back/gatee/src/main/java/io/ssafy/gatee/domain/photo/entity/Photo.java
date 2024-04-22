package io.ssafy.gatee.domain.photo.entity;

import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.member.entity.Member;
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
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "file_id", cascade = CascadeType.ALL)
    private File file;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
