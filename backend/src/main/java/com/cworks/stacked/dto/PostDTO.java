package com.cworks.stacked.dto;

import java.time.LocalDateTime;

public class PostDTO {
    private int postId;
    private String title;
    private String body;

    public PostDTO() {}
    public PostDTO(int postId, String title, String body, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.postId = postId;
        this.title = title;
        this.body = body;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

}
