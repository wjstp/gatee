package io.ssafy.gatee.domain.file.application;

import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.file.entity.type.FileType;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface FileService {

    FileUrlRes uploadFile(FileType fileType, MultipartFile file) throws IOException;

    void remove(Long id) throws FileNotFoundException;

    Object[] getObject(Long fileId) throws Exception;
}
