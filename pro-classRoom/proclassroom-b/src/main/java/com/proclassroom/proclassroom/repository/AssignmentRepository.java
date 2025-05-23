package com.proclassroom.proclassroom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proclassroom.proclassroom.model.Assignment;
import com.proclassroom.proclassroom.model.ClassRoom;
import com.proclassroom.proclassroom.model.User; // Import User model

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {

    // Fetch assignments created by a specific teacher (createBy refers to User)
    List<Assignment> findByCreateBy(User teacher);

    // Fetch assignments for a list of classrooms
    List<Assignment> findByClassRoomIn(List<ClassRoom> classRooms);

    List<Assignment> findByClassRoom(ClassRoom classRoom);

}
