
package com.cworks.stacked.repository;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.cworks.stacked.model.User;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Add new user
    public void addUser(@NotNull User user){
        String sql = "INSERT INTO users (" +
                "username," +
                "email," +
                "password," +
                "display_name," +
                "bio," +
                "date_created)" +
                "VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getDisplayName(),
                user.getBio(),
                user.getDateCreated()
        );
    }

    // Fetch user by ID
    public User getUserById(int id){
        String sql = "SELECT * FROM users WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                User u = new User();
                u.setId(rs.getInt("id"));
                u.setUsername(rs.getString("username"));
                u.setEmail(rs.getString("email"));
                u.setPassword(rs.getString("password"));
                u.setDisplayName(rs.getString("display_name"));
                u.setBio(rs.getString("bio"));
                return u;
            }, id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

}