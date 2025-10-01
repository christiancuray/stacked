package com.cworks.stacked.dto;

import java.time.LocalDateTime;

public class PostDTO {
    private int postId;
    private String title;
    private String body;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PostDTO() {}
    public PostDTO(int postId, String title, String body, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.postId = postId;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
