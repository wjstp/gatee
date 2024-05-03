package io.ssafy.gatee.domain.file.api;

import io.ssafy.gatee.domain.file.application.FileService;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.file.entity.type.FileType;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FileUrlRes uploadFile(@RequestParam FileType fileType,
                                 @RequestParam MultipartFile file) throws IOException {
        return fileService.uploadFile(fileType, file);
    }

    @GetMapping("/{fileId}")
    @ResponseStatus(HttpStatus.OK)
    public void downloadFile(@PathVariable Long fileId, HttpServletResponse response) throws Exception {
        Object[] object = fileService.getObject(fileId);
        byte[] fileContent = (byte[]) object[0];

        String fileName = UUID.randomUUID().toString() + "_Spring-learning";
        response.setContentLength(fileContent.length);
        response.getOutputStream().write(fileContent);
        response.getOutputStream().flush();
    }
}
