package com.zoo.zoo.service;

import com.zoo.zoo.model.Animal;
import com.zoo.zoo.model.Pair;

import java.util.List;

public interface PairService {
    Pair findPairByAnimals(Animal firstAnimal, Animal secondAnimal);

    List<Pair> findAllPairs();

    Pair savePair(Animal first, Animal second);
}
