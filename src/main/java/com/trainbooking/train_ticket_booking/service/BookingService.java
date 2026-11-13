package com.trainbooking.train_ticket_booking.service;

import com.trainbooking.train_ticket_booking.dto.BookingRequest;
import com.trainbooking.train_ticket_booking.exception.ResourceNotFoundException;
import com.trainbooking.train_ticket_booking.model.Booking;
import com.trainbooking.train_ticket_booking.model.Train;
import com.trainbooking.train_ticket_booking.model.User;
import com.trainbooking.train_ticket_booking.repository.BookingRepository;
import com.trainbooking.train_ticket_booking.repository.TrainRepository;
import com.trainbooking.train_ticket_booking.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class BookingService {
    private final BookingRepository bookingRepo;
    private final UserRepository userRepo;
    private final TrainRepository trainRepo;

//    public BookingService(BookingRepository bookingRepo, UserRepository userRepo, TrainRepository trainRepo) {
//        this.bookingRepo = bookingRepo;
//        this.userRepo = userRepo;
//        this.trainRepo = trainRepo;
//    }

    public Booking bookTicket(BookingRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Train train = trainRepo.findById(request.getTrainId())
                .orElseThrow(() -> new ResourceNotFoundException("Train not found"));

        List<Booking> bookedSeats = bookingRepo.findByTrainAndTravelDate(train, request.getTravelDate());
        if (bookedSeats.stream().anyMatch(b -> b.getSeatNumber().equals(request.getSeatNumber()))) {
            throw new RuntimeException("Seat already booked!");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTrain(train);
        booking.setTravelDate(request.getTravelDate());
        booking.setSeatNumber(request.getSeatNumber());

        return bookingRepo.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    public void cancelBooking(Long id) {
        bookingRepo.deleteById(id);
    }
}
