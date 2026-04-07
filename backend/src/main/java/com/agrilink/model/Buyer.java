package com.agrilink.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "buyers")
public class Buyer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String location;
    private Double rating;
    private Integer deals;
    private String buying;
    private String quantity;
    private String payment;
    private String phone;
    private Boolean verified = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getDeals() { return deals; }
    public void setDeals(Integer deals) { this.deals = deals; }
    public String getBuying() { return buying; }
    public void setBuying(String buying) { this.buying = buying; }
    public String getQuantity() { return quantity; }
    public void setQuantity(String quantity) { this.quantity = quantity; }
    public String getPayment() { return payment; }
    public void setPayment(String payment) { this.payment = payment; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }
}
