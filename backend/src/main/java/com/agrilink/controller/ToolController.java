package com.agrilink.controller;

import com.agrilink.model.Tool;
import com.agrilink.repository.ToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tools")
@CrossOrigin(origins = "*")
public class ToolController {

    @Autowired private ToolRepository toolRepository;

    @GetMapping
    public ResponseEntity<?> getAllTools() {
        try {
            return ResponseEntity.ok(toolRepository.findAll());
        } catch (Exception e) {
            return error("Failed to fetch tools", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTool(@PathVariable Long id) {
        try {
            return toolRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return error("Tool not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createTool(@RequestBody Tool tool) {
        try {
            if (tool.getName() == null || tool.getName().isBlank())
                return error("Tool name is required", HttpStatus.BAD_REQUEST);
            if (tool.getPrice() == null || tool.getStock() == null)
                return error("Price and stock are required", HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(HttpStatus.CREATED).body(toolRepository.save(tool));
        } catch (Exception e) {
            return error("Failed to create tool", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTool(@PathVariable Long id, @RequestBody Tool updated) {
        try {
            return toolRepository.findById(id).map(tool -> {
                tool.setName(updated.getName());
                tool.setCategory(updated.getCategory());
                tool.setPrice(updated.getPrice());
                tool.setStock(updated.getStock());
                tool.setDescription(updated.getDescription());
                return ResponseEntity.ok(toolRepository.save(tool));
            }).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return error("Failed to update tool", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTool(@PathVariable Long id) {
        try {
            if (!toolRepository.existsById(id)) return ResponseEntity.notFound().build();
            toolRepository.deleteById(id);
            Map<String, Object> res = new HashMap<>();
            res.put("success", true);
            res.put("message", "Tool deleted successfully");
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return error("Failed to delete tool", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<Map<String, Object>> error(String msg, HttpStatus status) {
        Map<String, Object> res = new HashMap<>();
        res.put("success", false);
        res.put("message", msg);
        return ResponseEntity.status(status).body(res);
    }
}
