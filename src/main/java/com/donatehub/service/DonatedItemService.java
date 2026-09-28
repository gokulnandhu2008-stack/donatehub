package com.donatehub.service;

import com.donatehub.entity.DonatedItem;
import com.donatehub.repository.DonatedItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonatedItemService {

    @Autowired
    private DonatedItemRepository donatedItemRepository;

    public DonatedItem createItem(DonatedItem item) {
        return donatedItemRepository.save(item);
    }

    public List<DonatedItem> getAllItems() {
        return donatedItemRepository.findAll();
    }

    public Optional<DonatedItem> getItemById(Long id) {
        return donatedItemRepository.findById(id);
    }

    public DonatedItem updateItem(Long id, DonatedItem item) {

        DonatedItem existing = donatedItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        existing.setItemName(item.getItemName());
        existing.setCategory(item.getCategory());
        existing.setQuantity(item.getQuantity());
        existing.setCollected(item.isCollected());
        existing.setDistributed(item.isDistributed());

        return donatedItemRepository.save(existing);
    }

    public void deleteItem(Long id) {

        if (!donatedItemRepository.existsById(id)) {
            throw new RuntimeException("Item not found");
        }

        donatedItemRepository.deleteById(id);
    }
    public DonatedItem collectItem(Long id) {

    DonatedItem item = donatedItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Item not found"));

    item.setCollected(true);

    return donatedItemRepository.save(item);
}
public List<DonatedItem> getAvailableStock() {

    return donatedItemRepository.findAll()
            .stream()
            .filter(item -> item.isCollected() && !item.isDistributed())
            .toList();
}
public DonatedItem distributeItem(Long id) {

    DonatedItem item = donatedItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Item not found"));

    if (!item.isCollected()) {
        throw new RuntimeException("Item must be collected before distribution");
    }

    item.setDistributed(true);

    return donatedItemRepository.save(item);
}
}