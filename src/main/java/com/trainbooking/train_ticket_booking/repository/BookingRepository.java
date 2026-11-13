package com.trainbooking.train_ticket_booking.repository;

import com.trainbooking.train_ticket_booking.model.Booking;
import com.trainbooking.train_ticket_booking.model.Train;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByTrainAndTravelDate(Train train, LocalDate travelDate);

    long countByTrainAndTravelDate(Train train, LocalDate travelDate);
}
