package com.zoo.zoo.controller;

import com.zoo.zoo.dtos.PairCountDTO;
import com.zoo.zoo.model.Allocation;
import com.zoo.zoo.model.Animal;
import com.zoo.zoo.model.Pair;
import com.zoo.zoo.repository.AnimalRepository;
import com.zoo.zoo.service.AllocationService;
import com.zoo.zoo.service.AnimalService;
import com.zoo.zoo.service.PairService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/allocation")
@AllArgsConstructor
public class AllocationController {
    public final AllocationService allocationService;

    @GetMapping("/generate")
    public Allocation generateAllocation() {
        return allocationService.generateAllocation();
    }

    @PostMapping
    public String saveAllocation(@RequestBody Allocation allocation) {
        allocationService.saveAllocation(allocation.getAreas());
        return "Распределение сохранено";
    }
}
