package com.farmer.fullstack.controller;

import com.farmer.fullstack.model.User;
import com.farmer.fullstack.model.Customer;
import com.farmer.fullstack.model.Farmer;
import com.farmer.fullstack.security.JwtUtil;
import com.farmer.fullstack.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ✅ REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        System.out.println("regi>>>" + user);
        Map<String, Object> response = new HashMap<>();

        try {
            if (authService.isUserExists(user.getEmail())) {
                response.put("success", false);
                response.put("message", "User already registered with this email.");
                return new ResponseEntity<>(response, HttpStatus.CONFLICT);
            }

            // Encrypt password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            User savedUser = authService.register(user);
            response.put("success", true);
            response.put("message", "User registered successfully!");
            response.put("data", savedUser);
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ✅ LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        try {
            String email = request.get("email");
            String password = request.get("password");
            String role = request.get("role");

            System.out.println("Login Attempt: " + email + " | Role: " + role);

            if (role == null || role.isEmpty()) {
                response.put("success", false);
                response.put("message", "Role is required.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            Optional<?> userOpt;

            switch (role.toLowerCase()) {
            case "admin":
                userOpt = authService.loginAdmin(email, password);
                break;
            case "customer":
                userOpt = authService.loginCustomer(email, password);
                break;
            case "farmer":
                userOpt = authService.loginFarmer(email, password);
                break;
            default:
                response.put("success", false);
                response.put("message", "Invalid role.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

            if (!userOpt.isPresent()) {
                response.put("success", false);
                response.put("message", "Invalid email or password for " + role);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            Object user = userOpt.get();

            // Get stored hashed password
            String storedHashedPassword = "";
            if (user instanceof User) {
                storedHashedPassword = ((User) user).getPassword();
            } else if (user instanceof Customer) {
                storedHashedPassword = ((Customer) user).getPassword();
            } else if (user instanceof Farmer) {
                storedHashedPassword = ((Farmer) user).getPassword();
            }

            // Check password
            if (!passwordEncoder.matches(password, storedHashedPassword)) {
                response.put("success", false);
                response.put("message", "Invalid email or password for " + role);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            String token = jwtUtil.generateToken(email);

            response.put("success", true);
            response.put("message", "Login successful.");
            response.put("token", token);
            response.put("role", role);
            response.put("user", user);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ✅ CHECK IF USER EXISTS (used for frontend validation)
    @PostMapping("/check-user")
    public ResponseEntity<Map<String, Boolean>> checkUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean exists = authService.isUserExists(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    // ✅ CHECK JWT TOKEN VALIDITY
    @GetMapping("/check-auth")
    public ResponseEntity<Map<String, Object>> checkAuth(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String email = jwtUtil.extractEmail(token);

                boolean valid = jwtUtil.validateToken(token, email);
                response.put("authenticated", valid);
                response.put("email", email);
                response.put("message", valid ? "Token valid." : "Token expired or invalid.");
                return ResponseEntity.ok(response);
            }

            response.put("authenticated", false);
            response.put("message", "Missing or invalid Authorization header.");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);

        } catch (Exception e) {
            response.put("authenticated", false);
            response.put("message", "Error verifying token: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}
