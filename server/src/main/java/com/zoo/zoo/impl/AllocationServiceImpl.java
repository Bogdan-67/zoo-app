package com.zoo.zoo.impl;

import com.zoo.zoo.dtos.PairCountDTO;
import com.zoo.zoo.model.*;
import com.zoo.zoo.repository.AllocationRepository;
import com.zoo.zoo.repository.AreaRepository;
import com.zoo.zoo.service.AllocationService;
import com.zoo.zoo.service.AnimalService;
import com.zoo.zoo.service.AreaService;
import com.zoo.zoo.service.PairService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@AllArgsConstructor
public class AllocationServiceImpl implements AllocationService {

    public final PairService pairService;
    public final AnimalService animalService;
    public final AllocationRepository allocationRepository;
    public final AreaService areaService;

    @Override
    public Allocation generateAllocation() {
        List<Animal> animals = animalService.findAllAnimals();
        // Создаем список ожидания
        WaitingList waitList = new WaitingList();
        // Загружаем животных
        waitList.loadAnimals(animals);
        List<Pair> pairs = pairService.findAllPairs();
        Allocation allocation = new Allocation();

        // Пока список ожидания не пуст
        while (!waitList.isEmpty()) {
            // Берем первое животное из списка ожидания
            Animal animal = waitList.getFirst();
            // Все пары животного с количеством повторений
            List<List<Object>> countPairs = areaService.findPairsByAnimal(animal);
            // Потенциальные партнеры
            Map<Animal, Integer> partners = new HashMap<>();
            // Для пар с наибольшим количеством повторений
            List<List<Object>> maxCount = new ArrayList<>();

            // Перебор найденных пар для добавления партнеров
            for (List<Object> pair : countPairs) {
                Animal first = (Animal) pair.get(1);
                Animal second = (Animal) pair.get(2);

                // Проверяем, чтобы животное не было равно animal и было в списке ожидания
                if (!first.equals(animal) && waitList.inList(first)) {
                    partners.put(first, 0);
                } else if (!second.equals(animal) && waitList.inList(second)) {
                    partners.put(second, 0);
                }
            }

            // Добавление тоже максимальных пар
            for (List<Object> pair : countPairs) {
                // Если maxCount пуст до добавляем первый элемент
                Animal first = (Animal) pair.get(1);
                Animal second = (Animal) pair.get(2);
                if (maxCount.isEmpty()) {
                    if (!first.equals(animal) && waitList.inList(first) || !second.equals(animal) && waitList.inList(second)) {
                        maxCount.add(countPairs.get(0));
                    }
                }
                // Сравниваем счетчик данной пары с первой в массиве
                else if (pair.get(3).equals(maxCount.get(0).get(3)) && first.getPredator().equals(second.getPredator())) {
                    // Если первое или второе животное не равно ищущему и находится в списке ожидания
                    if (!first.equals(animal) && waitList.inList(first) || !second.equals(animal) && waitList.inList(second)) {
                        maxCount.add(pair);
                    }
                }
            }

            if (maxCount.isEmpty()) {
                Pair solo = new Pair();
                solo.setFirst(animal);
                allocation.addPair(solo);
                waitList.removeFromList(animal);
            }
            else if (maxCount.size() == 1) {
                Animal first = (Animal) maxCount.get(0).get(1);
                Animal second = (Animal) maxCount.get(0).get(2);
                Pair pair = new Pair();
                pair.setFirst(first);
                pair.setSecond(second);
                allocation.addPair(pair);
                waitList.removeFromList(first);
                waitList.removeFromList(second);
            } else {
                // Проходим по каждому партнеру для поиска количства пар
                for (Map.Entry<Animal, Integer> entry : partners.entrySet()) {
                    Animal partner = entry.getKey();
                    // Получить количество пар у партнера
                    Integer countPartner = areaService.countAllPairsByAnimal(partner);
                    // Сохранить в хэшмап
                    partners.put(partner, countPartner);
                }
                // Поиск партнера с минимальным количеством пар
                Optional<Map.Entry<Animal, Integer>> min = partners.entrySet().stream()
                        .min(Comparator.comparingInt(Map.Entry::getValue));

                // Проверка на наличие элементов в хэшмапе
                if (min.isPresent()) {
                    Animal partner = min.get().getKey();

                    Pair pair = new Pair();
                    pair.setFirst(animal);
                    pair.setSecond(partner);
                    allocation.addPair(pair);
                    waitList.removeFromList(animal);
                    waitList.removeFromList(partner);
                }
            }
        }

        return allocation;
    }

    @Override
    @Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)
    public Allocation saveAllocation(List<Area> areas) {
            // Создаем новое распределение
            Allocation allocation = new Allocation();
            allocationRepository.save(allocation);
            // Перебираем вольеры
            for (Area area : areas) {
                areaService.saveArea(area, allocation);
            }

//        List<Pair> pairs = allocation.getAreas();
//        for (Pair pair : pairs) {
//            // Получить пару из БД
//            Pair pairDb = pairService.findPairByAnimals(pair.getFirst(), pair.getSecond());
//            // Увеличить счетчик для пары
//            pairService.incrementPair(pairDb);
//        }

        return null;
    }
}
