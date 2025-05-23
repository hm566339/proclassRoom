package com.proclassroom.proclassroom.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.proclassroom.proclassroom.dto.AnnouncementDTO;
import com.proclassroom.proclassroom.model.Announcement;
import com.proclassroom.proclassroom.model.ClassRoom;
import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.repository.AnnouncementRepository;
import com.proclassroom.proclassroom.repository.ClassroomRepository;
import com.proclassroom.proclassroom.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    public Announcement createAnnounment(AnnouncementDTO dto) {

        ClassRoom persentClass = classroomRepository.findById(dto.getClassRoom())
                .orElseThrow(() -> new IllegalArgumentException("ClassRoom is Not found" + dto.getClassRoom()));

        User persentUser = userRepository.findById(dto.getPoster())
                .orElseThrow(() -> new IllegalArgumentException("User not found" + dto.getPoster()));

        Announcement newaAnnouncement = new Announcement();
        newaAnnouncement.setClassRoom(persentClass);
        newaAnnouncement.setPoster(persentUser);
        newaAnnouncement.setContent(dto.getContent());

        return announcementRepository.save(newaAnnouncement);

    }

}
