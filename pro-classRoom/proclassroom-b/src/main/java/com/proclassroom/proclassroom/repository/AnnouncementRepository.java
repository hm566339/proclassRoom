package com.proclassroom.proclassroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proclassroom.proclassroom.model.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {

}
