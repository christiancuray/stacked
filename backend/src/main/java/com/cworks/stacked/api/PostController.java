package com.cworks.stacked.api;

import com.cworks.stacked.service.PostService;
import com.cworks.stacked.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public void addPost(@RequestBody  Post post) {
        postService.addPost(post);

    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable int id){
        Post post = postService.getPostById(id);
        return post != null ? post : null;
    }

    @GetMapping("/all")
    public java.util.List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @DeleteMapping("/{id}")
    public void deletePostById(@PathVariable int id){
        postService.deletePostById(id);
    }

    @GetMapping("/count")
    public long countPosts(){
        return postService.countPost();
    }






}
