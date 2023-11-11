package com.zoo.zoo.impl;

import com.zoo.zoo.dtos.PairCountDTO;
import com.zoo.zoo.model.Allocation;
import com.zoo.zoo.model.Animal;
import com.zoo.zoo.model.Area;
import com.zoo.zoo.model.Pair;
import com.zoo.zoo.repository.AreaRepository;
import com.zoo.zoo.service.AreaService;
import com.zoo.zoo.service.PairService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AreaServiceImpl implements AreaService {
    public final AreaRepository areaRepository;
    public final PairService pairService;

    @Override
    public Area saveArea(Area area, Allocation allocation) {
        Area areaModel = new Area();
        // Находим пару из вольера, если существует
        Pair pair = pairService.findPairByAnimals(area.getFirst(), area.getSecond());
        // Устанавливаем поля
        areaModel.setFirst(area.getFirst());
        areaModel.setSecond(area.getSecond());
        areaModel.setAllocation(allocation);
        areaModel.setPair(pair);
        // Сохраняем в БД
        areaRepository.save(areaModel);
        return areaModel;
    }

    @Override
    public List<List<Object>> findPairsByAnimal(Animal animal) {
        return areaRepository.findPairsByAnimal(animal);
    }

    @Override
    public Integer countAllPairsByAnimal(Animal animal) {
        return areaRepository.countAllPairsByAnimal(animal);
    }
}
