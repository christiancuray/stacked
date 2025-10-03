package com.cworks.stacked.model;

import jakarta.persistence.*;

@Entity
@Table(name = "media")

public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mediaId;
    private String mediaUrl;
    private String mediaType;

    // many to one relationship with Post
    @ManyToOne
    @JoinColumn(name="postId") // FK to Post
    private Post post;

    public Media() {}
    public Media( String mediaUrl, String mediaType) {
        this.mediaUrl = mediaUrl;
        this.mediaType = mediaType;
    }
    public int getId() { return mediaId; }
    public void setId(int id) { this.mediaId = id; }

    public String getMediaUrl() { return mediaUrl; }
    public void setMediaUrl(String mediaUrl) { this.mediaUrl = mediaUrl; }
    public String getMediaType() { return mediaType; }
    public void setMediaType(String mediaType) { this.mediaType = mediaType; }
}
