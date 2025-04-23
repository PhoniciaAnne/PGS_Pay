//package com.pgs.billpayment.securityconfig;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        // Enable CORS and disable CSRF
//        http
//            .cors(Customizer.withDefaults())
//            .csrf(AbstractHttpConfigurer::disable)
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/customer/requestCustomerUpdate",
//                        "/admin/editCustomer",
//                        "/admin/editBiller",
//                        "/biller/requestBillerUpdate",                        
//                        "/auth/login/**",
//                        "/auth/signup/**",
//                        "/biller/**",
//                        "/admin/**"
//                    ).permitAll()
//                    .anyRequest().authenticated()
//                );
//
//            return http.build();
//        }
//    @Bean
////    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//
//        configuration.addAllowedOrigin("http://localhost:3000");
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("*");
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/", configuration);
//        return source;
//    }
//}
//
//       
//

package com.pgs.billpayment.securityconfig;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Enable CORS and disable CSRF
        http
            .cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                		"/auth/**",
                	    "/customer/**",
                	    "/biller/**",
                	    "/admin/**",
                	    "/images/**"
                ).permitAll()

//            		.requestMatchers("/auth/").permitAll()
//                    .requestMatchers("/admin/").hasRole("Admin")
//                    .requestMatchers("/biller/").hasRole("Biller")
//                    .requestMatchers("/customer/").hasRole("Customer")
                .anyRequest().authenticated()
            );

        return http.build();
    }

   
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); 
        return source;
    }
}

