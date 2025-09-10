package com.cworks.stacked.repository;


import com.cworks.stacked.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoUser  extends JpaRepository<User, Integer> {
}
