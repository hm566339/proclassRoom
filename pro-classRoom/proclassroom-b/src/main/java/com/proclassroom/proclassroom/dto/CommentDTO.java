package com.proclassroom.proclassroom.dto;

import lombok.Data;

@Data
public class CommentDTO {

    private Integer assignmentId;
    private Integer user;
    private String commentText;

}
