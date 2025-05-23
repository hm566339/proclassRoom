package com.proclassroom.proclassroom.service;

import com.proclassroom.proclassroom.dto.ClassRoomDTO;
import com.proclassroom.proclassroom.model.Assignment;
import com.proclassroom.proclassroom.model.ClassRoom;
import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.repository.AssignmentRepository;
import com.proclassroom.proclassroom.repository.ClassroomRepository;
import com.proclassroom.proclassroom.repository.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ClassRoomService {

    private final AssignmentRepository assignmentRepository;
    private final ClassroomRepository classroomRepository;
    private final UserRepository userRepository;

    public ClassRoom createClassRoom(ClassRoomDTO dto) {
        User teacher = userRepository.findById(dto.getTeacherId())
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found with ID: " + dto.getTeacherId()));

        ClassRoom classRoom = new ClassRoom();
        classRoom.setClass_name(dto.getClassName());
        classRoom.setSubject(dto.getSubject());
        classRoom.setSection(dto.getSection());
        classRoom.setTeacher(teacher);

        return classroomRepository.save(classRoom);
    }

    public List<ClassRoom> getAllClassRooms() {
        return classroomRepository.findAll();
    }

    public List<ClassRoom> getClassroomsByTeacher(Integer teacherId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found with ID: " + teacherId));
        return teacher.getClassRooms();
    }

    public List<ClassRoom> getClassRoomsCreatedByUser(Integer userId) {
        User teacher = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User (Teacher) not found with ID: " + userId));
        return teacher.getClassRooms();
    }

    public List<ClassRoom> getAllClassRoomsWithAssignments() {
        List<ClassRoom> classRooms = classroomRepository.findAll();
        for (ClassRoom classRoom : classRooms) {
            List<Assignment> assignments = assignmentRepository.findByClassRoomIn(List.of(classRoom));
            classRoom.setAssignments(assignments);
        }
        return classRooms;
    }

    public void deleteClassRoomById(int classId) {
        if (!classroomRepository.existsById(classId)) {
            throw new IllegalArgumentException("ClassRoom not found with ID: " + classId);
        }
        classroomRepository.deleteById(classId);
    }

}
