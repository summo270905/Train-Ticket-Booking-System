package com.trainbooking.train_ticket_booking.repository;

import com.trainbooking.train_ticket_booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
