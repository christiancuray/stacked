package com.cworks.stacked.service;

//import com.cworks.stacked.repository.PostRepository;
import com.cworks.stacked.repository.RepoPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.cworks.stacked.model.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

@Service
public class PostService {

//    private final PostRepository postRepository;
//
//    @Autowired
//    public PostService(PostRepository postRepository) {
//        this.postRepository = postRepository;
//    }

//
//    List<Post> posts = new ArrayList<>(Arrays.asList(
//            new Post(1, "Post 1", "This is the body of post 1"),
//            new Post(2, "Post 2", "This is the body of post 2"),
//            new Post(3, "Post 3", "This is the body of post 3")
//    ));
//
//    public List<Post> getPosts(){ return posts; }

    @Autowired
    RepoPost repoPost;

    // add post
    public void addPost(Post post) {
        repoPost.save(post);
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

    // public void addMockData(){
    //     repoPost.save(Post p = new Post())
    // }


}
