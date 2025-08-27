package com.cworks.stacked.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cworks.stacked.model.Post;

@Repository
public interface RepoPost extends JpaRepository<Post, Integer> {

}
