package com.agrilink.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tool_id", nullable = false)
    private Long toolId;

    @Column(name = "farmer_id", nullable = false)
    private Long farmerId;

    @Column(name = "farmer_name", nullable = false)
    private String farmerName;

    @Column(name = "farmer_phone", nullable = false)
    private String farmerPhone;

    @Column(name = "farmer_address", nullable = false)
    private String farmerAddress;

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    @Column(nullable = false)
    private Integer days = 1;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(nullable = false)
    private String status = "Pending";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Tool name for display (transient)
    @Transient
    private String toolName;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getToolId() { return toolId; }
    public void setToolId(Long toolId) { this.toolId = toolId; }
    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }
    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }
    public String getFarmerPhone() { return farmerPhone; }
    public void setFarmerPhone(String farmerPhone) { this.farmerPhone = farmerPhone; }
    public String getFarmerAddress() { return farmerAddress; }
    public void setFarmerAddress(String farmerAddress) { this.farmerAddress = farmerAddress; }
    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }
    public Integer getDays() { return days; }
    public void setDays(Integer days) { this.days = days; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getToolName() { return toolName; }
    public void setToolName(String toolName) { this.toolName = toolName; }
}
