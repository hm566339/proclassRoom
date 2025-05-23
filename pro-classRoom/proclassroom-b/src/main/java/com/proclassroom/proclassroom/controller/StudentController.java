package com.proclassroom.proclassroom.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.proclassroom.proclassroom.dto.CommentDTO;
import com.proclassroom.proclassroom.dto.EnrollMentsDTO;
import com.proclassroom.proclassroom.dto.SubmissionsDTO;
import com.proclassroom.proclassroom.model.Assignment;
import com.proclassroom.proclassroom.model.ClassRoom;
import com.proclassroom.proclassroom.model.Comment;
import com.proclassroom.proclassroom.model.EnrollMents;

import com.proclassroom.proclassroom.model.Submissions;
import com.proclassroom.proclassroom.service.AssignmentService;
import com.proclassroom.proclassroom.service.ClassRoomService;
import com.proclassroom.proclassroom.service.CommentService;
import com.proclassroom.proclassroom.service.EnrollMentsService;
import com.proclassroom.proclassroom.service.SubmissionService;

import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;

@RestController
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class StudentController {

    @Autowired
    private EnrollMentsService enrollMentsService;

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private ClassRoomService classRoomService;

    @Autowired
    private AssignmentService assignmentService;

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/dashboard")
    public String studentController() {
        return "Walcome to student";
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> createEnroll(@RequestBody EnrollMentsDTO dto) {

        try {
            EnrollMents created = enrollMentsService.createEnroll(dto);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/comment")
    public ResponseEntity<?> comment(@RequestBody CommentDTO dto) {
        try {
            Comment createComment = commentService.createComment(dto);
            return ResponseEntity.ok(createComment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(value = "/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadSubmission(
            @RequestParam("assignmentId") int assignmentId,
            @RequestParam("studentId") int studentId,
            @RequestParam(value = "grade", required = false) Float grade,
            @RequestParam("feedback") String feedback,
            @RequestPart("file") MultipartFile file) {

        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File cannot be empty");
            }

            SubmissionsDTO dto = new SubmissionsDTO();
            dto.setAssignmentId((Integer) assignmentId);
            dto.setStudentId((Integer) studentId);
            dto.setGrade(grade);
            dto.setFeedback(feedback);
            dto.setFile(file);
            System.out.println(dto);
            Submissions submission = submissionService.saveSubmission(dto);
            return ResponseEntity.ok(submission);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error uploading submission: " + e.getMessage());
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ClassRoom>> getStudentEnrollments(@PathVariable Integer studentId) {
        List<ClassRoom> classRooms = enrollMentsService.getEnrolledClassRooms(studentId);
        return ResponseEntity.ok(classRooms);
    }

    @GetMapping("/classrooms/assignments")
    public List<ClassRoom> getAllClassRoomsWithAssignments() {
        return classRoomService.getAllClassRoomsWithAssignments();
    }

    @GetMapping("/students/{studentId}/assignments")
    public List<Assignment> getAssignmentsForStudent(@PathVariable Integer studentId) {
        return assignmentService.getAssignmentsForStudent(studentId);
    }

    @GetMapping("assignmentss/{id}")
    public ResponseEntity<Assignment> getAssignmentById(@PathVariable("id") Integer id) {
        Assignment assignment = assignmentService.getAssignmentById(id);
        return ResponseEntity.ok(assignment);
    }

    @GetMapping("/assignmentssclsaa/{id}")
    public ResponseEntity<?> getAssignment(@PathVariable("id") Integer id) {
        Assignment assignment = assignmentService.getAssignmentById(id);

        String filename = Paths.get(assignment.getPathfile()).getFileName().toString();
        // String publicPath = "/uploads/assignment/" + filename;
        String publicPath = "/files/assignments/" + filename;

        Map<String, String> response = new HashMap<>();
        response.put("pathfile", publicPath);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/files/assignments/{filename:.+}")
    @PermitAll
    public ResponseEntity<Resource> serveAssignmentFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("D:/final1/proclassroom/uploads/assignment")
                    .resolve(filename).normalize();

            System.out.println("Trying to read file from: " + filePath.toAbsolutePath());

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF)
                        .header(HttpHeaders.CONTENT_DISPOSITION,
                                "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                System.out.println("File not found or not readable.");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/assignment/classroom/{classRoomId}")
    public List<Assignment> getAssignmentsByClassRoom(@PathVariable Integer classRoomId) {
        return assignmentService.getAssignmentsByClassRoom(classRoomId);
    }

}
