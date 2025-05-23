package com.proclassroom.proclassroom.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "enrollments")
public class EnrollMents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    private Long enrollmentId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "class_id", nullable = false, referencedColumnName = "class_id")
    private ClassRoom classRoom;

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonManagedReference
    private User student;

    @Column(name = "enrolled_at", updatable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;
}
