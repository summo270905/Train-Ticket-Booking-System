package com.trainbooking.train_ticket_booking.service;

import com.trainbooking.train_ticket_booking.exception.ResourceNotFoundException;
import com.trainbooking.train_ticket_booking.model.User;
import com.trainbooking.train_ticket_booking.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository repo;

//    public UserService(UserRepository repo) {
//        this.repo = repo;
//    }

    public User createUser(User user) {
        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User getUserById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public void deleteUser(Long id) {
        repo.deleteById(id);
    }

    public User updateUser(Long id, User updatedUser) {
        User existingUser = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());

        return repo.save(existingUser);
    }
}
