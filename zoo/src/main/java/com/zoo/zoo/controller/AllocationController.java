package com.zoo.zoo.controller;

import com.zoo.zoo.model.Allocation;
import com.zoo.zoo.model.Pair;
import com.zoo.zoo.repository.AnimalRepository;
import com.zoo.zoo.service.PairService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/allocation")
@AllArgsConstructor
public class AllocationController {
    public final PairService pairService;
    public final AnimalRepository animalRepository;


    @GetMapping("/generate")
    public Allocation generateAllocation() {
        return null;
    }

    @PostMapping
    public String saveAllocation(@RequestBody Allocation allocation) {
        List<Pair> pairs = allocation.getAreas();
        for (Pair pair : pairs) {
            // Получить пару из БД
            Pair pairDb = pairService.findPairByAnimals(pair.getFirst(), pair.getSecond());
            // Увеличить счетчик для пары
            pairService.incrementPair(pairDb);
        }
        return "Распределение сохранено";
    }
}
