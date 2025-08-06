package com.examserver2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security configuration for the application.
 * <p>
 * - Configures JWT authentication and authorization for all endpoints except /api/auth/** (public).
 * - Registers the JwtFilter to validate JWT tokens on each request.
 * - Sets up stateless session management for REST APIs.
 * - Provides beans for password encoding, authentication manager, and in-memory user for testing.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
//	@Autowired
//	private JwtFilter jwtFilter;   // ✅ Inject JwtFilter created earlier



    /**
     * Configures the security filter chain:
     * <ul>
     *   <li>Disables CSRF (not needed for stateless REST APIs)</li>
     *   <li>Allows unauthenticated access to /api/auth/** endpoints (signup, login)</li>
     *   <li>Requires authentication for all other endpoints</li>
     *   <li>Adds JwtFilter before UsernamePasswordAuthenticationFilter to validate JWT tokens</li>
     *   <li>Sets session management to stateless</li>
     * </ul>
     * @param http HttpSecurity
     * @param jwtFilter JwtFilter for JWT validation
     * @return SecurityFilterChain
     * @throws Exception if configuration fails
     */
    @SuppressWarnings("removal")
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        http
            .cors()
            .and()
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


    /**
     * Provides a BCrypt password encoder bean for secure password hashing.
     * @return PasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }
    /**
     * Provides a UserDetailsService that loads users from the database.
     * Replaces in-memory user with database-backed authentication.
     * @return UserDetailsService
     */
    

    /**
     * Exposes the AuthenticationManager bean for authentication needs (e.g., login endpoint).
     * @param config AuthenticationConfiguration
     * @return AuthenticationManager
     * @throws Exception if configuration fails
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
