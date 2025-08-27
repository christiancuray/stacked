//package com.cworks.stacked.repository;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.EmptyResultDataAccessException;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Repository;
//import com.cworks.stacked.model.Post;


public class PostRepository {

//    private final JdbcTemplate jdbcTemplate;
//
//    @Autowired
//    public PostRepository(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//    }
//
//    public void addPost(Post post){
//        String sql = "INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)";
//        jdbcTemplate.update(sql,
//                post.getUserId(),
//                post.getTitle(),
//                post.getBody());
//    }
//
//
//    public Post getPostById(int id){
//        String sql = "SELECT * FROM posts WHERE id = ?";
//        try {
//            return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
//                Post p = new Post();
//                p.setId(rs.getInt("id"));
//                p.setUserId(rs.getInt("user_id"));
//                p.setTitle(rs.getString("title"));
//                p.setBody(rs.getString("body"));
//                return p;
//            }, id);
//        } catch (EmptyResultDataAccessException e) {
//            return null;
//        }
//    }


}
