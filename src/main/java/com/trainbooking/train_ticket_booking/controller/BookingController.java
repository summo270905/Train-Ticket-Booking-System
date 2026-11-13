package com.trainbooking.train_ticket_booking.controller;

import com.trainbooking.train_ticket_booking.dto.BookingRequest;
import com.trainbooking.train_ticket_booking.model.Booking;
import com.trainbooking.train_ticket_booking.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @PostMapping
    public Booking bookTicket(@RequestBody BookingRequest request) {
        return service.bookTicket(request);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return service.getAllBookings();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return service.getBookingById(id);
    }

    @DeleteMapping("/{id}")
    public void cancelBooking(@PathVariable Long id) {
        service.cancelBooking(id);
    }


}
