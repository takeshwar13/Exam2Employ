package com.examserver2.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * Web configuration for CORS (Cross-Origin Resource Sharing).
 * <p>
 * Allows requests from the React frontend (http://localhost:3000) to the backend API.
 * Configures allowed methods, headers, and credentials for cross-origin requests.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configures CORS to allow requests from the frontend.
     * @param registry CorsRegistry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}