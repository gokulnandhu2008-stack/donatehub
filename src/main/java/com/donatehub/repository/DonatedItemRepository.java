package com.donatehub.repository;

import com.donatehub.entity.DonatedItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonatedItemRepository extends JpaRepository<DonatedItem, Long> {

}