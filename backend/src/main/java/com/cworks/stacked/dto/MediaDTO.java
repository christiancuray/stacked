package com.cworks.stacked.dto;

public class MediaDTO {
    private int mediaId;
    private int postId;
    private String mediaUrl;
    private String mediaType;

    public MediaDTO() {}
    public MediaDTO(int mediaId, int postId, String mediaUrl, String mediaType) {
        this.mediaId = mediaId;
        this.postId = postId;
        this.mediaUrl = mediaUrl;
        this.mediaType = mediaType;
    }

    public int getMediaId() {
        return mediaId;
    }

    public void setMediaId(int mediaId) {
        this.mediaId = mediaId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getMediaUrl() {
        return mediaUrl;
    }

    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }
}
