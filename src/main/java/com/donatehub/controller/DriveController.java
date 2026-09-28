package com.donatehub.controller;

import com.donatehub.entity.Drive;
import com.donatehub.service.DriveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drives")
public class DriveController {

    @Autowired
    private DriveService driveService;

    @PostMapping
    public ResponseEntity<Drive> createDrive(@RequestBody Drive drive) {
        return ResponseEntity.ok(driveService.createDrive(drive));
    }

    @GetMapping
    public ResponseEntity<List<Drive>> getAllDrives() {
        return ResponseEntity.ok(driveService.getAllDrives());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Drive> getDriveById(@PathVariable Long id) {
        return driveService.getDriveById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Drive> updateDrive(
            @PathVariable Long id,
            @RequestBody Drive drive) {

        return ResponseEntity.ok(
                driveService.updateDrive(id, drive)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDrive(@PathVariable Long id) {
        driveService.deleteDrive(id);
        return ResponseEntity.ok("Drive deleted successfully");
    }
}