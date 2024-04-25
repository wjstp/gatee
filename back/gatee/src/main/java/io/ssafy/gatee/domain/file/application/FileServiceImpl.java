package io.ssafy.gatee.domain.file.application;

import io.ssafy.gatee.domain.file.dao.FileRepository;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.file.entity.type.FileType;
import io.ssafy.gatee.global.s3.util.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;
    private final S3Util s3Util;

    @Override
    @Transactional
    public FileUrlRes uploadFile(FileType fileType, MultipartFile file) throws IOException {
        File entity = s3Util.upload(fileType, file);
        fileRepository.save(entity);

        return FileUrlRes.builder()
                .imageUrl(entity.getUrl())
                .build();
    }

    @Override
    public void remove(Long id) throws FileNotFoundException {
        File file = fileRepository.findById(id)
                .orElseThrow(FileNotFoundException::new);
        s3Util.remove(file);
    }

    @Override
    public Object[] getObject(Long id) throws Exception {
        File file = fileRepository.findById(id)
                .orElseThrow(FileNotFoundException::new);
        return new Object[]{s3Util.getFile(file)};
    }
}