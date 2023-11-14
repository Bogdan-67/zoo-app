package com.zoo.zoo.service;

import com.zoo.zoo.model.Allocation;
import com.zoo.zoo.model.Area;

import java.util.List;

public interface AllocationService {
    Allocation generateAllocation();

    Allocation saveAllocation(List<Area> areas);
}
