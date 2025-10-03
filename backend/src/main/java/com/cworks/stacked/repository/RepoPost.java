package com.cworks.stacked.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.cworks.stacked.model.Post;

import java.util.List;

@Repository
public interface RepoPost extends JpaRepository<Post, Integer> {
    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.user ORDER BY p.createdAt DESC")
    List<Post> findAllWithUser();
}
