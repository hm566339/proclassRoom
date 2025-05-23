package com.proclassroom.proclassroom.model;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Submissions")
public class Submissions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int submissionid;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    @JsonManagedReference
    private Assignment assignmentId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonManagedReference
    private User student;

    @CreationTimestamp
    private Timestamp submittedAt;

    private String fileUrl;

    private Float greade;
    private String feedback;
}
