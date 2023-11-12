package com.zoo.zoo.controller;

import com.zoo.zoo.model.Allocation;
import com.zoo.zoo.service.AllocationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


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
