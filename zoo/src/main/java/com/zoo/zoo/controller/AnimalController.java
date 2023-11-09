package com.zoo.zoo.controller;

import com.zoo.zoo.model.Animal;
import lombok.AllArgsConstructor;
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
    public Animal saveAnimal(@RequestBody Animal animal) {
        return animalService.saveAnimal(animal);
    }

    @DeleteMapping
    public void deleteAnimal(@RequestBody Long id) {
        animalService.deleteAnimal(id);
    }

}
