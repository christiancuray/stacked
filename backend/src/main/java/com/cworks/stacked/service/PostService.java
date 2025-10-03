package com.cworks.stacked.service;

import com.cworks.stacked.dto.PostDTO;
import com.cworks.stacked.repository.RepoPost;
import com.cworks.stacked.repository.RepoUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.cworks.stacked.model.*;
import java.util.List;

@Service
public class PostService {


    @Autowired
    RepoPost repoPost;
    
    @Autowired
    RepoUser repoUser;

    // add post
    public PostDTO addPost(PostDTO postDTO) {
        // Get the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // Find the user by username
        User user = repoUser.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found: " + username);
        }
        
        // Create post with user association
        Post post = new Post(postDTO.getTitle(), postDTO.getBody());
        post.setUser(user); // Associate the post with the user
        
        // Save the post
        Post savedPost = repoPost.save(post);
        
        // Set the generated id in the DTO
        postDTO.setPostId(savedPost.getId());
        return postDTO;
    }

    // get post by id
    public Post getPostById(int id){
        return repoPost.findById(id).orElse(null);
    }

    // get all posts
    public List<Post> getAllPosts() {
        return repoPost.findAllWithUser();
    }

    public void deletePostById(int id) {
        repoPost.deleteById(id);
    }

    public long countPost(){
        return repoPost.count();
    }


    public Post updatePost(int id, Post post) {
        Post existingPost = repoPost.findById(id).orElse(null);
        if (existingPost == null) {
            return null;
        }
        existingPost.setTitle(post.getTitle());
        existingPost.setBody(post.getBody());
        return repoPost.save(existingPost);
    }
}
