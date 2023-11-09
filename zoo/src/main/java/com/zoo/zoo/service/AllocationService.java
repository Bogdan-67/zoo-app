package com.zoo.zoo.service;

import com.zoo.zoo.model.Allocation;

public interface AllocationService {
    Allocation generateAllocation();

    Allocation saveAllocation();
}
