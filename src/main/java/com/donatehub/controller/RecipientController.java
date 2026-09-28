package com.donatehub.controller;

import com.donatehub.entity.Recipient;
import com.donatehub.service.RecipientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipients")
public class RecipientController {

    @Autowired
    private RecipientService recipientService;

    @PostMapping
    public ResponseEntity<Recipient> createRecipient(@RequestBody Recipient recipient) {
        return ResponseEntity.ok(recipientService.createRecipient(recipient));
    }

    @GetMapping
    public ResponseEntity<List<Recipient>> getAllRecipients() {
        return ResponseEntity.ok(recipientService.getAllRecipients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipient> getRecipientById(@PathVariable Long id) {
        return recipientService.getRecipientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipient> updateRecipient(
            @PathVariable Long id,
            @RequestBody Recipient recipient) {

        return ResponseEntity.ok(
                recipientService.updateRecipient(id, recipient)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRecipient(@PathVariable Long id) {
        recipientService.deleteRecipient(id);
        return ResponseEntity.ok("Recipient deleted successfully");
    }
}