package com.zoo.zoo.model;


import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "animals")
@NoArgsConstructor
public class Animal {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    @Column(unique = true)
    private String name;
    @NonNull
    private Boolean predator;
}
