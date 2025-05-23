package com.proclassroom.proclassroom.model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "classroom")
public class ClassRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int class_id;

    @Column(name = "class_name", nullable = false)
    private String class_name;
    private String subject;
    private String section;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    @JsonManagedReference
    private User teacher;

    @OneToMany(mappedBy = "classRoom")
    @JsonBackReference
    private List<EnrollMents> enrollment;

    @OneToMany(mappedBy = "classRoom")
    @JsonBackReference
    private List<Assignment> assignments;

    @CreationTimestamp
    @Column(name = "create_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}