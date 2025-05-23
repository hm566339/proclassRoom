package com.proclassroom.proclassroom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proclassroom.proclassroom.dto.CommentDTO;
import com.proclassroom.proclassroom.model.Assignment;
import com.proclassroom.proclassroom.model.Comment;
import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.repository.AssignmentRepository;
import com.proclassroom.proclassroom.repository.CommentRepository;
import com.proclassroom.proclassroom.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CommentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private CommentRepository commentRepository;

    public Comment createComment(CommentDTO dto) {

        User persentuse = userRepository.findById(dto.getUser())
                .orElseThrow(() -> new IllegalArgumentException("User not found" + dto.getUser()));

        Assignment persentAssig = assignmentRepository.findById(dto.getAssignmentId())
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found" + dto.getAssignmentId()));

        Comment newComment = new Comment();
        newComment.setAssignment(persentAssig);
        newComment.setUser(persentuse);
        newComment.setCommentText(dto.getCommentText());

        return commentRepository.save(newComment);

    }

}
