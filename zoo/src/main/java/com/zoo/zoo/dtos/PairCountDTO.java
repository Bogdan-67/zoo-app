package com.zoo.zoo.dtos;

import com.zoo.zoo.model.Animal;
import com.zoo.zoo.model.Pair;

public class PairCountDTO {
    private Long id;
    private Animal first;
    private Animal second;
    private int count;

    public PairCountDTO(Long id, Animal first, Animal second, int count) {
        this.id = id;
        this.first = first;
        this.second = second;
        this.count = count;
    }
}
