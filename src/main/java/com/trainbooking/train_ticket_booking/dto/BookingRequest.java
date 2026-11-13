package com.trainbooking.train_ticket_booking.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long userId;
    private Long trainId;
    private LocalDate travelDate;
    private Integer seatNumber;
}
