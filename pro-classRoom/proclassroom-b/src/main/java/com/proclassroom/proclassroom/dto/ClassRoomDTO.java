package com.proclassroom.proclassroom.dto;

import lombok.Data;

@Data
public class ClassRoomDTO {
    private String className;
    private String subject;
    private String section;
    private Integer teacherId;
}
