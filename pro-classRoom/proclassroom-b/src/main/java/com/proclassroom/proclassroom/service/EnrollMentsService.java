package com.proclassroom.proclassroom.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.proclassroom.proclassroom.dto.EnrollMentsDTO;

import com.proclassroom.proclassroom.model.ClassRoom;
import com.proclassroom.proclassroom.model.EnrollMents;
import com.proclassroom.proclassroom.model.User;

import com.proclassroom.proclassroom.repository.ClassroomRepository;
import com.proclassroom.proclassroom.repository.EnrollMentsRepository;
import com.proclassroom.proclassroom.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EnrollMentsService {

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnrollMentsRepository enrollMentsRepository;

    public EnrollMents createEnroll(EnrollMentsDTO dto) {

        ClassRoom persentClasss = classroomRepository.findById(dto.getClassRoom())
                .orElseThrow(() -> new IllegalArgumentException("ClassRoom not found with Id :" + dto.getClassRoom()));

        User persentUser = userRepository.findById(dto.getStudent())
                .orElseThrow(() -> new IllegalArgumentException("Student Id id not Found :" + dto.getStudent()));

        EnrollMents newEnrollMents = new EnrollMents();
        newEnrollMents.setClassRoom(persentClasss);
        newEnrollMents.setStudent(persentUser);

        return enrollMentsRepository.save(newEnrollMents);
    }

    public List<ClassRoom> getEnrolledClassRooms(Integer studentId) {
        List<EnrollMents> enrollments = enrollMentsRepository.findByStudentId(studentId);
        List<ClassRoom> classRooms = new ArrayList<>();
        for (EnrollMents enrollment : enrollments) {
            classRooms.add(enrollment.getClassRoom());
        }
        return classRooms;
    }

    public List<ClassRoom> getEnrolledClassRoomsForStudent(User student) {
        List<EnrollMents> enrollments = enrollMentsRepository.findByStudent(student);
        return enrollments.stream()
                .map(EnrollMents::getClassRoom)
                .collect(Collectors.toList());
    }

    public List<User> getStudentsByClassId(Integer classId) {
        return enrollMentsRepository.findStudentsByClassId(classId);
    }

}
