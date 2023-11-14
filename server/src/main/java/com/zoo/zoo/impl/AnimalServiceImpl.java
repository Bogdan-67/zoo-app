package com.zoo.zoo.impl;

import com.zoo.zoo.exceptions.BadRequest;
import com.zoo.zoo.model.Animal;
import com.zoo.zoo.repository.AnimalRepository;
import com.zoo.zoo.service.AnimalService;
import com.zoo.zoo.service.PairService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class AnimalServiceImpl implements AnimalService {
    private final AnimalRepository repository;
    private final PairService pairService;

    @Override
    public List<Animal> findAllAnimals() {
        return repository.findAll();
    }

    @Override
    @Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)
    public Animal saveAnimal(Animal animal) {
            List<Animal> animals = this.findAllAnimals();
            Animal finalAnimal = animal;
            if (animals.stream().anyMatch(oldAnimal -> Objects.equals(finalAnimal.getName(), oldAnimal.getName()))) {
                throw new BadRequest("Животное уже существует!");
            }
            animal = repository.save(animal);
            for (Animal oldAnimal : animals) {
                if (animal.getPredator() == oldAnimal.getPredator()) {
                    pairService.savePair(animal, oldAnimal);
                }
            }
            return animal;
    }

    @Override
    @Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)
    public void deleteAnimal(Animal animal) {
        pairService.deletePairsByAnimal(animal);
        repository.delete(animal);
    }
}
