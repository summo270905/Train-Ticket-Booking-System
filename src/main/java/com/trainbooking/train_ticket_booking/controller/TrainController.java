package com.trainbooking.train_ticket_booking.controller;

import com.trainbooking.train_ticket_booking.model.Train;
import com.trainbooking.train_ticket_booking.service.TrainService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/trains")
public class TrainController {
    private final TrainService service;

    public TrainController(TrainService service) {
        this.service = service;
    }

    @PostMapping
    public Train createTrain(@RequestBody Train train) {
        return service.createTrain(train);
    }

    @GetMapping
    public List<Train> getAllTrains() {
        return service.getAllTrains();
    }

    @GetMapping("/{id}")
    public Train getTrainById(@PathVariable Long id) {
        return service.getTrainById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTrain(@PathVariable Long id) {
        service.deleteTrain(id);
    }

    @PutMapping("/{id}")
    public Train updateTrain(@PathVariable Long id, @RequestBody Train train) {
        return service.updateTrain(id, train);
    }

}
