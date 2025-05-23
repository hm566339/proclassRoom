package com.proclassroom.proclassroom.dto;

import lombok.Data;

@Data
public class UserDTO {

    private Integer id;
    private String firstname;
    private String secondname;
    private String email;
    private String address;
    private Long mobilenumber;

}
