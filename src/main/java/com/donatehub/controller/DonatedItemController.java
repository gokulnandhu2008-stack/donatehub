package com.donatehub.controller;

import com.donatehub.entity.DonatedItem;
import com.donatehub.service.DonatedItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class DonatedItemController {

    @Autowired
    private DonatedItemService donatedItemService;

    @PostMapping
    public ResponseEntity<DonatedItem> createItem(@RequestBody DonatedItem item) {
        return ResponseEntity.ok(donatedItemService.createItem(item));
    }

    @GetMapping
    public ResponseEntity<List<DonatedItem>> getAllItems() {
        return ResponseEntity.ok(donatedItemService.getAllItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonatedItem> getItemById(@PathVariable Long id) {
        return donatedItemService.getItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonatedItem> updateItem(
            @PathVariable Long id,
            @RequestBody DonatedItem item) {

        return ResponseEntity.ok(
                donatedItemService.updateItem(id, item)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {
        donatedItemService.deleteItem(id);
        return ResponseEntity.ok("Item deleted successfully");
    }
    @PutMapping("/{id}/collect")
public ResponseEntity<DonatedItem> collectItem(@PathVariable Long id) {

    return ResponseEntity.ok(
            donatedItemService.collectItem(id)
    );
}
@GetMapping("/stock")
public ResponseEntity<List<DonatedItem>> getAvailableStock() {

    return ResponseEntity.ok(
            donatedItemService.getAvailableStock()
    );
}
@PutMapping("/{id}/distribute")
public ResponseEntity<DonatedItem> distributeItem(@PathVariable Long id) {

    return ResponseEntity.ok(
            donatedItemService.distributeItem(id)
    );
}
}