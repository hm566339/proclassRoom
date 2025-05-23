package com.proclassroom.proclassroom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.proclassroom.proclassroom.model.User;

import com.proclassroom.proclassroom.model.EnrollMents;

public interface EnrollMentsRepository extends JpaRepository<EnrollMents, Integer> {
    List<EnrollMents> findByStudentId(Integer studentId);

    List<EnrollMents> findByStudent(User student);

    @Query("SELECT e.student FROM EnrollMents e WHERE e.classRoom.class_id = :classId")
    List<User> findStudentsByClassId(@Param("classId") Integer classId);
}
