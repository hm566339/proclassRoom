
package com.proclassroom.proclassroom.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.dto.*;
import com.proclassroom.proclassroom.model.*;
import com.proclassroom.proclassroom.repository.UserRepository;
import com.proclassroom.proclassroom.service.*;

import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;

@RestController
@PreAuthorize("hasRole('TEACHER')")
@RequiredArgsConstructor
public class TeacherController {

    @Autowired
    private final ClassRoomService classRoomService;
    private final UserService userService;
    private final AssignmentService assignmentService;
    private final AnnouncementService announcementService;
    private final GradingCategoriesService gradingCategoriesService;
    private final EnrollMentsService enrollMentsService;
    private final UserRepository userRepository;
    private final SubmissionService submissionService;
    @Autowired
    private PdfService pdfService;

    @PostMapping("/create")
    public ResponseEntity<?> createClassRoom(@RequestBody ClassRoomDTO dto) {
        try {
            ClassRoom created = classRoomService.createClassRoom(dto);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllClassRooms() {
        return ResponseEntity.ok(classRoomService.getAllClassRooms());
    }

    @GetMapping("/{teacherId}")
    public ResponseEntity<?> getTeacher(@PathVariable Integer teacherId) {
        return userService.findById(teacherId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("User not found"));
    }

    @PostMapping(value = "/assignmentcreate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createAssignment(
            @RequestParam("ClassRoomId") Integer ClassRoomId,
            @RequestParam("CreateBy") int CreateBy,
            @RequestParam("description") String description,
            @RequestParam("title") String title,
            @RequestParam("LocalDate") LocalDate dueDate,
            @RequestParam("max_score") float max_score,
            @RequestParam("file") MultipartFile file) {
        System.out.println(ClassRoomId);
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is not present");
            }
            AssignmentDTO dto = new AssignmentDTO();
            dto.setClassRoom((Integer) ClassRoomId);
            dto.setCreateBy((Integer) CreateBy);
            dto.setDescription(description);
            dto.setTitle(title);
            dto.setDueDate(dueDate);
            dto.setMax_score(max_score);
            dto.setFile(file);
            Assignment assignment = assignmentService.createAssignment(dto);
            return ResponseEntity.ok(assignment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error uploading assignment: " + e.getMessage());
        }
    }

    @PostMapping("/announcement")
    public ResponseEntity<?> createAnnouncement(@RequestBody AnnouncementDTO dto) {
        try {
            Announcement created = announcementService.createAnnounment(dto);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/grading")
    public ResponseEntity<?> createGrading(@RequestBody GradingCategoriesDTO dto) {
        try {
            GradingCategories created = gradingCategoriesService.createGraing(dto);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/class/{teacherId}")
    public ResponseEntity<?> getClassRoomByTeacherId(@PathVariable int teacherId) {
        List<ClassRoom> classRoom = classRoomService.getClassroomsByTeacher(teacherId);
        return ResponseEntity.ok(classRoom);
    }

    @GetMapping("/assignments/{teacherId}")
    public ResponseEntity<?> getAssignmentsByTeacherId(@PathVariable Integer teacherId) {
        try {
            List<Assignment> assignments = assignmentService.getAssignmentsByTeacher(teacherId);
            return ResponseEntity.ok(assignments);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving assignments: " + e.getMessage());
        }
    }

    @DeleteMapping("/{assignmentId}")
    public ResponseEntity<String> deleteAssignment(@PathVariable Integer assignmentId) {
        try {
            assignmentService.deleteAssignment(assignmentId);
            return new ResponseEntity<>("Assignment deleted successfully", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Error deleting assignment", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{assignmentId}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable Integer assignmentId,
            @RequestBody AssignmentDTO dto) {
        try {
            Assignment updatedAssignment = assignmentService.updateAssignment(assignmentId, dto);
            return new ResponseEntity<>(updatedAssignment, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}/classrooms")
    public ResponseEntity<List<ClassRoom>> getClassRoomsCreatedByUser(@PathVariable Integer userId) {
        List<ClassRoom> classRooms = classRoomService.getClassRoomsCreatedByUser(userId);
        return ResponseEntity.ok(classRooms);
    }

    @GetMapping("/{studentId}/classrooms")
    public ResponseEntity<List<ClassRoom>> getStudentClassrooms(@PathVariable Integer studentId) {
        return userRepository.findById(studentId)
                .map(student -> ResponseEntity.ok(enrollMentsService.getEnrolledClassRoomsForStudent(student)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/classes/{classId}/students")
    public List<User> getStudentsByClass(@PathVariable Integer classId) {
        return enrollMentsService.getStudentsByClassId(classId);
    }

    @GetMapping("/assignment/{assignmentId}")
    public ResponseEntity<List<Submissions>> getSubmissionsByAssignmentId(@PathVariable int assignmentId) {
        List<Submissions> submissions = submissionService.getSubmissionsByAssignmentId(assignmentId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/files/submission/{filename:.+}")
    @PermitAll
    public ResponseEntity<Resource> serveAssignmentFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("D:/final1/proclassroom/uploads/submission")
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

    @DeleteMapping("/deletclass/{classId}")
    public ResponseEntity<String> deleteClassRoom(@PathVariable int classId) {
        try {
            classRoomService.deleteClassRoomById(classId);
            return ResponseEntity.ok("ClassRoom deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/compare-names")
    public ResponseEntity<List<ComparisonResult>> compareByFileNames(@RequestBody List<String> fileNames) {
        try {
            String folderPath = "D:\\final1\\proclassroom\\uploads\\submission";

            List<File> files = fileNames.stream()
                    .map(name -> {
                        if (!name.toLowerCase().endsWith(".pdf")) {
                            name += ".pdf";
                        }
                        File file = new File(folderPath, name);
                        System.out.println("Checking file: " + file.getAbsolutePath() + " Exists: " + file.exists());
                        return file;
                    })
                    .filter(File::exists)
                    .collect(Collectors.toList());

            if (files.size() < 2) {
                return ResponseEntity.badRequest().body(new ArrayList<>());
            }

            List<ComparisonResult> results = pdfService.comparePdfParagraphsFromFiles(files);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
