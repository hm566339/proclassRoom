package com.proclassroom.proclassroom.service;

import com.proclassroom.proclassroom.dto.SubmissionsDTO;
import com.proclassroom.proclassroom.model.Assignment;
import com.proclassroom.proclassroom.model.Submissions;
import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.repository.AssignmentRepository;
import com.proclassroom.proclassroom.repository.SubmissionsRepository;
import com.proclassroom.proclassroom.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionsRepository submissionsRepository;
    private final AssignmentRepository assignmentRepository;
    private final UserRepository userRepository;

    public SubmissionService(
            SubmissionsRepository submissionsRepository,
            AssignmentRepository assignmentRepository,
            UserRepository userRepository) {
        this.submissionsRepository = submissionsRepository;
        this.assignmentRepository = assignmentRepository;
        this.userRepository = userRepository;
    }

    public Submissions saveSubmission(SubmissionsDTO dto) throws IOException {
        String uploadDir = "D:\\final1\\proclassroom\\uploads\\submission";

        MultipartFile file = dto.getFile();

        System.out.println(file);

        if (file.isEmpty()) {
            throw new IllegalArgumentException("file is empty");
        }
        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new IllegalArgumentException("only pdf file are allowed");
        }

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Create a unique filename to prevent overwrites
        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
        Path filePath = Paths.get(uploadDir, fileName);
        System.out.println(filePath);

        // Save the file
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        System.out.println(Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING));

        // Fetch related entities
        Assignment assignment = assignmentRepository.findById(dto.getAssignmentId())
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found"));
        User student = userRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        // Prepare and save the submission object
        Submissions submission = new Submissions();
        submission.setAssignmentId(assignment);
        submission.setStudent(student);
        submission.setFileUrl(filePath.toString()); // Store full path
        submission.setFeedback(dto.getFeedback());
        submission.setGreade(dto.getGrade());

        return submissionsRepository.save(submission);
    }

    public List<Submissions> getSubmissionsByAssignmentId(int assignmentId) {
        return submissionsRepository.findByAssignmentId_AssignmentId(assignmentId);
    }

}
