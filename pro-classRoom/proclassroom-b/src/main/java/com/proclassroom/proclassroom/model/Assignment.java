package com.proclassroom.proclassroom.model;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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
@Table(name = "Assignment")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int assignmentId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "class_id", nullable = false)
    private ClassRoom classRoom;

    @JsonManagedReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createBy;

    private String description;

    private String title;

    private LocalDate dueDate;

    private float max_score;

    @CreationTimestamp
    private Timestamp assignment;

    @OneToMany(mappedBy = "assignment")
    private List<EnrollMents> enrollments = new ArrayList<>();

    private String pathfile;
}