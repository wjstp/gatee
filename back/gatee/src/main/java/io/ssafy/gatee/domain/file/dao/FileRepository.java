package io.ssafy.gatee.domain.file.dao;

import io.ssafy.gatee.domain.file.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {

    List<File> findByUrl(String url);

    boolean existsByUrl(String url);
}
