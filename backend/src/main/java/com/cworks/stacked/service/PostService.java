package com.cworks.stacked.service;

import com.cworks.stacked.repository.RepoPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cworks.stacked.model.*;
import java.util.List;

@Service
public class PostService {


    @Autowired
    RepoPost repoPost;

    // add post
    public Post addPost(Post post) {
        return repoPost.save(post);
    }

    // get post by id
    public Post getPostById(int id){
        return repoPost.findById(id).orElse(null);
    }

    // get all posts
    public List<Post> getAllPosts() {
        return repoPost.findAll();
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
        existingPost.setUserId(post.getUserId());
        return repoPost.save(existingPost);
    }
}
