package com.proclassroom.proclassroom.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.proclassroom.proclassroom.dto.AssignmentDTO;
import com.proclassroom.proclassroom.model.Assignment;
import com.proclassroom.proclassroom.model.ClassRoom;
import com.proclassroom.proclassroom.model.EnrollMents;
import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.repository.AssignmentRepository;
import com.proclassroom.proclassroom.repository.ClassroomRepository;
import com.proclassroom.proclassroom.repository.EnrollMentsRepository;
import com.proclassroom.proclassroom.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnrollMentsRepository enrollMentsRepository;

    String uploadDir = "D:\\final1\\proclassroom\\uploads\\assignment";

    public Assignment createAssignment(AssignmentDTO dto) throws IOException {
        MultipartFile file = dto.getFile();

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is not present");
        }

        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new IllegalArgumentException("Only PDF files are allowed");
        }

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filename = file.getOriginalFilename();
        Path filepath = Paths.get(uploadDir, filename);
        Files.copy(file.getInputStream(), filepath,
                StandardCopyOption.REPLACE_EXISTING);

        ClassRoom presentClass = classroomRepository.findById(dto.getClassRoom())
                .orElseThrow(() -> new IllegalArgumentException("ClassRoom not found: " +
                        dto.getClassRoom()));

        User presentUser = userRepository.findById(dto.getCreateBy())
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found by ID: " +
                        dto.getCreateBy()));

        Assignment newAssignment = new Assignment();
        newAssignment.setClassRoom(presentClass);
        newAssignment.setCreateBy(presentUser);
        newAssignment.setDescription(dto.getDescription());
        newAssignment.setTitle(dto.getTitle());
        newAssignment.setDueDate(dto.getDueDate());
        newAssignment.setMax_score(dto.getMax_score());
        newAssignment.setPathfile(filepath.toString());

        return assignmentRepository.save(newAssignment);
    }

    public List<Assignment> getAssignments() {
        return assignmentRepository.findAll();
    }

    // public List<Assignment> getAssignmentsByTeacher(Integer teacherId) {
    // return assignmentRepository.findByCreateById(teacherId);
    // }

    // DELETE assignment
    public void deleteAssignment(Integer assignmentId) throws IOException {
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found: " +
                        assignmentId));

        // Delete file from disk
        Path path = Paths.get(assignment.getPathfile());
        if (Files.exists(path)) {
            Files.delete(path);
        }

        // Delete from database
        assignmentRepository.delete(assignment);
    }

    // UPDATE assignment
    public Assignment updateAssignment(Integer assignmentId, AssignmentDTO dto)
            throws IOException {
        Assignment existingAssignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found: " +
                        assignmentId));

        // Update fields
        existingAssignment.setTitle(dto.getTitle());
        existingAssignment.setDescription(dto.getDescription());
        existingAssignment.setDueDate(dto.getDueDate());
        existingAssignment.setMax_score(dto.getMax_score());

        // Update file if new file provided
        MultipartFile file = dto.getFile();
        if (file != null && !file.isEmpty()) {
            if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
                throw new IllegalArgumentException("Only PDF files are allowed");
            }

            // Delete old file
            Path oldFilePath = Paths.get(existingAssignment.getPathfile());
            if (Files.exists(oldFilePath)) {
                Files.delete(oldFilePath);
            }

            // Save new file
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String filename = file.getOriginalFilename();
            Path newFilePath = Paths.get(uploadDir, filename);
            Files.copy(file.getInputStream(), newFilePath,
                    StandardCopyOption.REPLACE_EXISTING);

            existingAssignment.setPathfile(newFilePath.toString());
        }

        return assignmentRepository.save(existingAssignment);
    }

    public List<Assignment> getAssignmentsByTeacher(Integer teacherId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found with ID: "
                        + teacherId));

        return assignmentRepository.findByCreateBy(teacher);
    }

    public List<Assignment> getAssignmentsForStudent(Integer studentId) {

        List<EnrollMents> enrollments = enrollMentsRepository.findByStudentId(studentId);

        List<ClassRoom> enrolledClassRooms = new ArrayList<>();
        for (EnrollMents enrollment : enrollments) {
            enrolledClassRooms.add(enrollment.getClassRoom());
        }

        List<Assignment> assignments = assignmentRepository.findByClassRoomIn(enrolledClassRooms);

        return assignments;
    }

    public Assignment getAssignmentById(Integer assignmentId) {
        return assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new EntityNotFoundException("Assignment not found with id " + assignmentId));
    }

    public List<Assignment> getAssignmentsByClassRoom(Integer classRoomId) {
        ClassRoom classRoom = classroomRepository.findById(classRoomId)
                .orElseThrow(() -> new IllegalArgumentException("ClassRoom not found with ID: " + classRoomId));
        return assignmentRepository.findByClassRoom(classRoom);
    }

}
