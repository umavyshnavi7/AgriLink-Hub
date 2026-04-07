package com.agrilink.controller;

import com.agrilink.model.Buyer;
import com.agrilink.repository.BuyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/buyers")
@CrossOrigin(origins = "*")
public class BuyerController {

    @Autowired private BuyerRepository buyerRepository;

    @GetMapping
    public ResponseEntity<?> getAllBuyers() {
        try {
            return ResponseEntity.ok(buyerRepository.findAll());
        } catch (Exception e) {
            Map<String, Object> res = new HashMap<>();
            res.put("success", false);
            res.put("message", "Failed to fetch buyers");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/verified")
    public ResponseEntity<?> getVerifiedBuyers() {
        try {
            return ResponseEntity.ok(buyerRepository.findByVerifiedTrue());
        } catch (Exception e) {
            Map<String, Object> res = new HashMap<>();
            res.put("success", false);
            res.put("message", "Failed to fetch buyers");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }
}
