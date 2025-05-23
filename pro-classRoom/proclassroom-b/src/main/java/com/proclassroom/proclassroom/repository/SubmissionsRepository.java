package com.proclassroom.proclassroom.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.proclassroom.proclassroom.model.Submissions;

public interface SubmissionsRepository extends JpaRepository<Submissions, Integer> {
    List<Submissions> findByAssignmentId_AssignmentId(int assignmentId);

}
