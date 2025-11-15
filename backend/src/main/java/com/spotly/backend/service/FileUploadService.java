package com.spotly.backend.service;

import com.spotly.backend.exception.FileUploadException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class FileUploadService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;


    @Value("${aws.s3.region}")
    private String region;

    public FileUploadService(S3Client s3Client) {
        this.s3Client = s3Client;
    }


    public String uploadFile(MultipartFile file) {
        String uniqueFileName = UUID.randomUUID() + "-" + file.getOriginalFilename();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(uniqueFileName)
                .contentType(file.getContentType())
                .build();

        try {
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(
                    file.getInputStream(), file.getSize())
            );

            return String.format("https://%s.s3.%s.amazonaws.com/%s",
                    bucketName,
                    region,
                    uniqueFileName
            );

        } catch (IOException e) {
            throw new FileUploadException("Failed to read file: " + e.getMessage());
        } catch (SdkException e) {
            throw new FileUploadException("Failed to upload to S3: " + e.getMessage());
        }
    }
}