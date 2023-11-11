package com.zoo.zoo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
public class Pair {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    @ManyToOne
    private Animal first;
    @NonNull
    @ManyToOne
    private Animal second;
    @NonNull
    private Integer count = 0;
}
