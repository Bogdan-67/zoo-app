package com.zoo.zoo.service;

import com.zoo.zoo.model.Animal;

import java.util.List;

public interface AnimalService {
    List<Animal> findAllAnimals();

    Animal saveAnimal(Animal animal);

    void deleteAnimal(Animal animal);
}
