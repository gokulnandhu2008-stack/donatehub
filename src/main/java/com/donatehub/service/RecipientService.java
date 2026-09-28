package com.donatehub.service;

import com.donatehub.entity.Recipient;
import com.donatehub.repository.RecipientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipientService {

    @Autowired
    private RecipientRepository recipientRepository;

    public Recipient createRecipient(Recipient recipient) {
        return recipientRepository.save(recipient);
    }

    public List<Recipient> getAllRecipients() {
        return recipientRepository.findAll();
    }

    public Optional<Recipient> getRecipientById(Long id) {
        return recipientRepository.findById(id);
    }

    public Recipient updateRecipient(Long id, Recipient recipient) {

        Recipient existing = recipientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));

        existing.setName(recipient.getName());
        existing.setPhone(recipient.getPhone());
        existing.setEmail(recipient.getEmail());
        existing.setAddress(recipient.getAddress());

        return recipientRepository.save(existing);
    }

    public void deleteRecipient(Long id) {

        if (!recipientRepository.existsById(id)) {
            throw new RuntimeException("Recipient not found");
        }

        recipientRepository.deleteById(id);
    }
}