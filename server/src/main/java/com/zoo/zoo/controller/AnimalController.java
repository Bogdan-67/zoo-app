package com.zoo.zoo.controller;

import com.zoo.zoo.exceptions.BadRequest;
import com.zoo.zoo.model.Animal;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.zoo.zoo.service.AnimalService;

import java.util.List;

@RestController
@RequestMapping("/animals")
@AllArgsConstructor
public class AnimalController {

    private final AnimalService animalService;

    @GetMapping
    public List<Animal> findAllAnimals() {
        return animalService.findAllAnimals();
    }

    @PostMapping
    public ResponseEntity<?> saveAnimal(@RequestBody Animal animal) {

        try {
            Animal newAnimal = animalService.saveAnimal(animal);
            return ResponseEntity.status(HttpStatus.OK).body(newAnimal);
        }
        catch(BadRequest e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping
    public void deleteAnimal(@RequestBody Animal animal) {
        animalService.deleteAnimal(animal);
    }

}
