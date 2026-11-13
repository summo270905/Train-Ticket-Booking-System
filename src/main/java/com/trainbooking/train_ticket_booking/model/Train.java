package com.trainbooking.train_ticket_booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "train")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "train_name")
    private String trainName;

    @NotBlank
    @Column(name = "train_number", unique = true)
    private String trainNumber;

    private String source;
    private String destination;

    @Column(name = "ticket_price")
    private Double ticketPrice;

    @Column(name = "total_seats")
    private Integer totalSeats;

    @OneToMany(mappedBy = "train", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Booking> bookings = new ArrayList<>();

}
