package com.proclassroom.proclassroom.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class SubmissionsDTO {

    private Integer assignmentId;
    private Integer studentId;
    private Float grade;
    private String feedback;
    private MultipartFile file;

}
