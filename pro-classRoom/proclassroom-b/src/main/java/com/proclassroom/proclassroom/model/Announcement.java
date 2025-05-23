package com.proclassroom.proclassroom.model;

import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

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
@Table(name = "announcements")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassRoom classRoom;

    private String content;

    @ManyToOne
    @JoinColumn(name = "posted_by")
    private User poster;

    @CreationTimestamp
    @Column(name = "posted_at")
    private Timestamp postedAt;
}