package com.donatehub.service;

import com.donatehub.entity.Drive;
import com.donatehub.repository.DriveRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriveService {

    @Autowired
    private DriveRepository driveRepository;

    public Drive createDrive(Drive drive) {
        return driveRepository.save(drive);
    }

    public List<Drive> getAllDrives() {
        return driveRepository.findAll();
    }

    public Optional<Drive> getDriveById(Long id) {
        return driveRepository.findById(id);
    }

    public Drive updateDrive(Long id, Drive drive) {

        Drive existing = driveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drive not found"));

        existing.setName(drive.getName());
        existing.setLocation(drive.getLocation());
        existing.setStartDate(drive.getStartDate());
        existing.setEndDate(drive.getEndDate());

        return driveRepository.save(existing);
    }

    public void deleteDrive(Long id) {

        if (!driveRepository.existsById(id)) {
            throw new RuntimeException("Drive not found");
        }

        driveRepository.deleteById(id);
    }
}