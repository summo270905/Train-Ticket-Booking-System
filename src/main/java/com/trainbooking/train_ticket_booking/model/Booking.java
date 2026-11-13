package com.trainbooking.train_ticket_booking.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "booking",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"train_id", "travel_date", "seat_number"}
        )
)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "travel_date", nullable = false)
    private LocalDate travelDate;

    @Column(name = "seat_number")
    private Integer seatNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "train_id")
    private Train train;
}