package com.zoo.zoo.repository;

import com.zoo.zoo.model.Animal;
import com.zoo.zoo.model.Pair;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PairRepository extends JpaRepository<Pair, Long> {
    Optional<Pair> findByFirstAndSecond(Animal first, Animal second);

    void deleteByFirstOrSecond(Animal first, Animal second);
}
