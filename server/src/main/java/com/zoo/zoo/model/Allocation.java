package com.zoo.zoo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "allocations")
public class Allocation {
    @Id
    @GeneratedValue
    private Long id;
    @DateTimeFormat
    private Date created_at;
    @Transient
    @JsonManagedReference
    private List<Area> areas;

    public void addPair(Pair pair) {
        Area newArea = new Area();
        newArea.setFirst(pair.getFirst());
        newArea.setSecond(pair.getSecond());
        if (areas == null) {
            areas = new ArrayList<>();
        }
        areas.add(newArea);
    }
}
