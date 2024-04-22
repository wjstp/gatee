package io.ssafy.gatee.domain.family.entity;


import io.ssafy.gatee.domain.file.entity.File;
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
public class Family {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer score;

    @OneToOne(mappedBy = "file_id", cascade = CascadeType.ALL)
    private File file;
}
