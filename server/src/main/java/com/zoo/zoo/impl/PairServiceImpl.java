package com.zoo.zoo.impl;

import com.zoo.zoo.model.Animal;
import com.zoo.zoo.model.Pair;
import com.zoo.zoo.repository.AnimalRepository;
import com.zoo.zoo.repository.PairRepository;
import com.zoo.zoo.service.PairService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PairServiceImpl implements PairService {
    public final PairRepository pairRepository;
    public final AnimalRepository animalRepository;

    @Override
    @Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)
    public Pair findPairByAnimals(Animal firstAnimal, Animal secondAnimal) {
        Optional<Pair> pair = pairRepository.findByFirstAndSecond(firstAnimal, secondAnimal);

        if (pair.isPresent()) {
            return pair.get();
        }

        // Если не найдено, попробовать обратный порядок
        Optional<Pair> reversePair = pairRepository.findByFirstAndSecond(secondAnimal, firstAnimal);

        return reversePair.orElse(null);

    }

    @Override
    public List<Pair> findAllPairs() {
        return pairRepository.findAll();
    }

    @Override
    public Pair savePair(Animal first, Animal second) {
        // Создать новую пару
        Pair newPair = new Pair();
        newPair.setFirst(first);
        newPair.setSecond(second);
        // Сохранить в БД
        pairRepository.save(newPair);

        return newPair;
    }

    @Override
    public void deletePairsByAnimal(Animal animal) {
        pairRepository.deleteByFirstOrSecond(animal, animal);
    }
}
