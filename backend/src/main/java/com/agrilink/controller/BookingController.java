package com.agrilink.controller;

import com.agrilink.model.Booking;
import com.agrilink.model.Tool;
import com.agrilink.repository.BookingRepository;
import com.agrilink.repository.ToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired private BookingRepository bookingRepository;
    @Autowired private ToolRepository toolRepository;

    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        try {
            List<Booking> bookings = bookingRepository.findAll();
            bookings.forEach(b -> toolRepository.findById(b.getToolId())
                    .ifPresent(t -> b.setToolName(t.getName())));
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return error("Failed to fetch bookings", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<?> getBookingsByFarmer(@PathVariable Long farmerId) {
        try {
            List<Booking> bookings = bookingRepository.findByFarmerId(farmerId);
            bookings.forEach(b -> toolRepository.findById(b.getToolId())
                    .ifPresent(t -> b.setToolName(t.getName())));
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return error("Failed to fetch bookings", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            if (booking.getToolId() == null || booking.getFarmerName() == null)
                return error("Tool and farmer details are required", HttpStatus.BAD_REQUEST);

            Optional<Tool> tool = toolRepository.findById(booking.getToolId());
            if (tool.isEmpty()) return error("Tool not found", HttpStatus.NOT_FOUND);
            if (tool.get().getStock() <= 0) return error("Tool is out of stock", HttpStatus.BAD_REQUEST);

            // Calculate total price
            BigDecimal total = tool.get().getPrice().multiply(BigDecimal.valueOf(booking.getDays()));
            booking.setTotalPrice(total);
            booking.setStatus("Pending");

            // Reduce stock
            Tool t = tool.get();
            t.setStock(t.getStock() - 1);
            toolRepository.save(t);

            return ResponseEntity.status(HttpStatus.CREATED).body(bookingRepository.save(booking));
        } catch (Exception e) {
            return error("Failed to create booking", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            if (status == null) return error("Status is required", HttpStatus.BAD_REQUEST);

            return bookingRepository.findById(id).map(booking -> {
                // Restore stock if cancelled
                if ("Cancelled".equals(status) && !"Cancelled".equals(booking.getStatus())) {
                    toolRepository.findById(booking.getToolId()).ifPresent(t -> {
                        t.setStock(t.getStock() + 1);
                        toolRepository.save(t);
                    });
                }
                booking.setStatus(status);
                return ResponseEntity.ok(bookingRepository.save(booking));
            }).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return error("Failed to update status", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<Map<String, Object>> error(String msg, HttpStatus status) {
        Map<String, Object> res = new HashMap<>();
        res.put("success", false);
        res.put("message", msg);
        return ResponseEntity.status(status).body(res);
    }
}
