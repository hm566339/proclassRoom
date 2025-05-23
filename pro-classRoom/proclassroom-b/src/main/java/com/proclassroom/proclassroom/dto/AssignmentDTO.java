package com.proclassroom.proclassroom.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class AssignmentDTO {

    private int classRoom;
    private int createBy;
    private String description;
    private String title;
    private LocalDate dueDate;
    private float max_score;
    private MultipartFile file;
}
