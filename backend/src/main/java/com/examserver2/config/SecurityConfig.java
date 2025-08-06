package com.examserver2.config;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;  // ✅ ADD THIS
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // ✅ Enable @PreAuthorize or @Secured annotations
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()  // ✅ Public endpoints
                .anyRequest().authenticated()                // ✅ All others need authentication
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // ✅ Stateless API
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // ✅ JWT filter added before auth

        return http.build();
    }

    // Password Encoder (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // In-Memory User with encoded password and role
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        UserDetails user = User.withUsername("niketan")
                .password(encoder.encode("pass123"))
                .roles("USER")  // ✅ In-Memory USER
                .build();

        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

//package com.examserver2.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//	
////	@Autowired
////	private JwtFilter jwtFilter;   // ✅ Inject JwtFilter created earlier
//
//
//  @Bean
//  public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
//      http
//          .csrf(csrf -> csrf.disable())
//          .authorizeHttpRequests(auth -> auth
//              .requestMatchers("/api/auth/**").permitAll()
//              .anyRequest().authenticated()
//          )
//       // ✅ ADD JWT-based filter and disable session
//              .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // ✅ stateless API
//              .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // ✅ JWT filter add
//
////          .httpBasic(Customizer.withDefaults()); // No deprecation
//
//      return http.build();
//  }
//
//  // Password Encoder (Secure)
//  @Bean
//  public PasswordEncoder passwordEncoder() {
//      return new BCryptPasswordEncoder();
//  }
//
//  // In-Memory User with encoded password
//  @Bean
//  public UserDetailsService userDetailsService(PasswordEncoder encoder) {
//      UserDetails user = User.withUsername("niketan")
//              .password(encoder.encode("pass123"))
//              .roles("USER")
//              .build();
//      
//      UserDetails admin = User.withUsername("admin")
//              .password(encoder.encode("admin123"))
//              .roles("ADMIN")
//              .build();
//
//      return new InMemoryUserDetailsManager(user, admin);
//  }
//  
//  @Bean
//  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//      return config.getAuthenticationManager();
//  }
//
//}

