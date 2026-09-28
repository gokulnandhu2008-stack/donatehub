package com.donatehub.service;

import com.donatehub.entity.Donor;
import com.donatehub.repository.DonorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    public Donor createDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    public Optional<Donor> getDonorById(Long id) {
        return donorRepository.findById(id);
    }

    public Donor updateDonor(Long id, Donor donor) {

        Donor existing = donorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        existing.setName(donor.getName());
        existing.setPhone(donor.getPhone());
        existing.setEmail(donor.getEmail());
        existing.setAddress(donor.getAddress());

        return donorRepository.save(existing);
    }

    public void deleteDonor(Long id) {

        if (!donorRepository.existsById(id)) {
            throw new RuntimeException("Donor not found");
        }

        donorRepository.deleteById(id);
    }
}