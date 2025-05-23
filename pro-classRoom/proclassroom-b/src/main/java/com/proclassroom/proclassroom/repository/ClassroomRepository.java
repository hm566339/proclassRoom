package com.proclassroom.proclassroom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proclassroom.proclassroom.controller.User;
import com.proclassroom.proclassroom.model.ClassRoom;

public interface ClassroomRepository extends JpaRepository<ClassRoom, Integer> {
    List<ClassRoom> findByTeacher(User teacher);
}
