package com.examdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableMethodSecurity(prePostEnabled = true) // replaces @EnableGlobalMethodSecurity
public class SecurityConfig {
	
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/admin/**").hasRole("ADMIN")
            		.requestMatchers("/admin/").permitAll() 
                .requestMatchers("/recruiter/**").hasRole("RECRUITER")
                .anyRequest().authenticated()
            )
            .httpBasic(); // or plug in your JWT config here

        return http.build();
    }

    // Other beans like authenticationManager, passwordEncoder, etc. can go here
}

