package com.cworks.stacked.api;

import com.cworks.stacked.service.PostService;
import com.cworks.stacked.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/addPost")
    public ResponseEntity<Post> addPost(@RequestBody Post post) {
        return new ResponseEntity(postService.addPost(post), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable int id){
        Post post = postService.getPostById(id);
        if(post == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePostById(@PathVariable int id){
        postService.deletePostById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable int id, @RequestBody Post post){
        Post p = null;
        try {
            p = postService.updatePost(id, post);

        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(p == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else {
            return new ResponseEntity<>(p, HttpStatus.OK);
        }

    }

    @GetMapping("/count")
    public ResponseEntity<Long> countPosts(){
        return new ResponseEntity<>(postService.countPost(), HttpStatus.OK);
    }






}
