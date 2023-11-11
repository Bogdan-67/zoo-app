package com.zoo.zoo.impl;

import com.zoo.zoo.model.Animal;
import com.zoo.zoo.repository.AnimalRepository;
import com.zoo.zoo.service.AnimalService;
import com.zoo.zoo.service.PairService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
//        try {
            List<Animal> animals = this.findAllAnimals();
            animal = repository.save(animal);
            for (Animal oldAnimal : animals) {
                if (animal.getPredator() == oldAnimal.getPredator()) {
                    pairService.savePair(animal, oldAnimal);
                }
            }
            return animal;
//        } catch (Exception e) {
//            System.out.println("Поймано исключение: " + e.getMessage());
//            throw new Exception("Произошла ошибка при сохранении животного");
//        }
    }

    @Override
    public void deleteAnimal(Long id) {
        repository.deleteById(id);
        // todo: Удалять все пары, связанные с этим животным
    }
}
