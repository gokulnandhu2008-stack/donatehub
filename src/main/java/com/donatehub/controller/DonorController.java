package com.donatehub.controller;

import com.donatehub.entity.Donor;
import com.donatehub.service.DonorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping
    public ResponseEntity<Donor> createDonor(@RequestBody Donor donor) {
        return ResponseEntity.ok(donorService.createDonor(donor));
    }

    @GetMapping
    public ResponseEntity<List<Donor>> getAllDonors() {
        return ResponseEntity.ok(donorService.getAllDonors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donor> getDonorById(@PathVariable Long id) {
        return donorService.getDonorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Donor> updateDonor(
            @PathVariable Long id,
            @RequestBody Donor donor) {

        return ResponseEntity.ok(
                donorService.updateDonor(id, donor)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDonor(@PathVariable Long id) {
        donorService.deleteDonor(id);
        return ResponseEntity.ok("Donor deleted successfully");
    }
}