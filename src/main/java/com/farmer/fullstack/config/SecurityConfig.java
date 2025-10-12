package com.farmer.fullstack.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // disable CSRF for APIs
            .cors()            // enable CORS
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT stateless
            .and()
            .authorizeRequests()
            .antMatchers("/api/**").permitAll() // allow all /api endpoints
            .anyRequest().authenticated()
            .and()
            .httpBasic().disable(); // disable default basic auth;
    }
}
