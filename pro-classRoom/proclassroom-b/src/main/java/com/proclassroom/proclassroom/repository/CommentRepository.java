package com.proclassroom.proclassroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proclassroom.proclassroom.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
