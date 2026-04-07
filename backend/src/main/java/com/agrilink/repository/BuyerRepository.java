package com.agrilink.repository;

import com.agrilink.model.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BuyerRepository extends JpaRepository<Buyer, Long> {
    List<Buyer> findByVerifiedTrue();
    List<Buyer> findByType(String type);
}
