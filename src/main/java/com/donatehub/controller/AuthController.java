package com.donatehub.controller;

import com.donatehub.entity.User;
import com.donatehub.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> loginData) {

        String username = loginData.get("username");
        String password = loginData.get("password");

        boolean success =
                authService.login(username, password);

        if (success) {
            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Login successful"
                    )
            );
        }

        return ResponseEntity.status(401).body(
                Map.of(
                        "success", false,
                        "message", "Invalid username or password"
                )
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        User savedUser =
                authService.createUser(user);

        return ResponseEntity.ok(savedUser);
    }
}