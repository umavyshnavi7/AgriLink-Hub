package com.agrilink.repository;

import com.agrilink.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByFarmerId(Long farmerId);
    List<Booking> findByStatus(String status);
    List<Booking> findByToolId(Long toolId);
}
