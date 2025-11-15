package com.spotly.backend.controller;

import com.spotly.backend.dto.FileUploadResponseDto;
import com.spotly.backend.service.aws.FileUploadService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "${frontend.url}")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public FileUploadResponseDto uploadFile(
            @RequestParam("file") MultipartFile file
    ) {
        String url = fileUploadService.uploadFile(file);

        return new FileUploadResponseDto(url);
    }
}