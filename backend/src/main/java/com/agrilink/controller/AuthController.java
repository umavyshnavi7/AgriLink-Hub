package com.agrilink.controller;

import com.agrilink.JwtUtil;
import com.agrilink.model.User;
import com.agrilink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email    = request.get("email");
            String password = request.get("password");

            if (isBlank(email) || isBlank(password)) {
                return error(response, "Email and password are required", HttpStatus.BAD_REQUEST);
            }
            if (!EMAIL_PATTERN.matcher(email).matches()) {
                return error(response, "Invalid email format", HttpStatus.BAD_REQUEST);
            }

            User user = userRepository.findByEmail(email);
            if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
                return error(response, "Invalid email or password", HttpStatus.UNAUTHORIZED);
            }

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("name", user.getName());
            response.put("role", user.getRole());
            response.put("email", user.getEmail());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return error(response, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email    = request.get("email");
            String password = request.get("password");
            String name     = request.get("name");
            String role     = request.get("role");

            if (isBlank(email) || isBlank(password) || isBlank(name) || isBlank(role)) {
                return error(response, "All fields are required", HttpStatus.BAD_REQUEST);
            }
            if (!EMAIL_PATTERN.matcher(email).matches()) {
                return error(response, "Invalid email format", HttpStatus.BAD_REQUEST);
            }
            if (password.length() < 6) {
                return error(response, "Password must be at least 6 characters", HttpStatus.BAD_REQUEST);
            }
            if (!role.equals("farmer") && !role.equals("admin") && !role.equals("expert") && !role.equals("public")) {
                return error(response, "Invalid role", HttpStatus.BAD_REQUEST);
            }
            if (userRepository.findByEmail(email) != null) {
                return error(response, "Email already registered", HttpStatus.CONFLICT);
            }

            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setName(name);
            user.setRole(role);
            userRepository.save(user);

            response.put("success", true);
            response.put("message", "Account created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            return error(response, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean isBlank(String s) { return s == null || s.isBlank(); }

    private ResponseEntity<Map<String, Object>> error(Map<String, Object> response, String message, HttpStatus status) {
        response.put("success", false);
        response.put("message", message);
        return ResponseEntity.status(status).body(response);
    }
}
