package com.zoo.zoo.service;

import com.zoo.zoo.model.Allocation;
import com.zoo.zoo.model.Animal;
import com.zoo.zoo.model.Area;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AreaService {
    List<List<Object>> findPairsByAnimal(Animal animal);

    Area saveArea(Area area, Allocation allocation);

    Integer countAllPairsByAnimal(Animal animal);

    void deleteAreasByAnimal(Animal animal);
}
