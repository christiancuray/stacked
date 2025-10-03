package com.cworks.stacked.config;

import com.cworks.stacked.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.cworks.stacked.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final CorsConfig corsConfig;
    private final JwtUtil jwtUtil;

    @Autowired
    public SecurityConfig(CorsConfig corsConfig, JwtUtil jwtUtil) {
        this.corsConfig = corsConfig;
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers( "/api/auth/login", "/api/auth/register","/h2-console/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .headers(headers -> headers.frameOptions(frame -> frame.disable())); // Allow H2 console in frames
        return http.build();
    }
}
