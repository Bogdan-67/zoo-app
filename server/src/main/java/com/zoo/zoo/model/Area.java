package com.zoo.zoo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "areas")
public class Area {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Animal first;

    @ManyToOne
    private Animal second;

    @ManyToOne
    private Pair pair;

    @ManyToOne
    @JsonBackReference
    private Allocation allocation;
}
