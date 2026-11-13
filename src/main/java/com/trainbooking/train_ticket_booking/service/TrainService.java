package com.trainbooking.train_ticket_booking.service;

import com.trainbooking.train_ticket_booking.exception.ResourceNotFoundException;
import com.trainbooking.train_ticket_booking.model.Train;
import com.trainbooking.train_ticket_booking.repository.TrainRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TrainService {
    private final TrainRepository repo;

//    public TrainService(TrainRepository repo) {
//        this.repo = repo;
//    }

    public Train createTrain(Train train) {
        return repo.save(train);
    }

    public List<Train> getAllTrains() {
        return repo.findAll();
    }

    public Train getTrainById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Train not found"));
    }

    public void deleteTrain(Long id) {
        repo.deleteById(id);
    }

    public Train updateTrain(Long id, Train updatedTrain) {

        Train existingTrain = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Train not found"));

        existingTrain.setTrainName(updatedTrain.getTrainName());
        existingTrain.setTrainNumber(updatedTrain.getTrainNumber());
        existingTrain.setSource(updatedTrain.getSource());
        existingTrain.setDestination(updatedTrain.getDestination());
        existingTrain.setTicketPrice(updatedTrain.getTicketPrice());
        existingTrain.setTotalSeats(updatedTrain.getTotalSeats());

        return repo.save(existingTrain);
    }

}
