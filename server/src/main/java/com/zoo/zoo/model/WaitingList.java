package com.zoo.zoo.model;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class WaitingList {
    private LinkedList<Animal> waitingAnimals = new LinkedList<>();

    public void loadAnimals(List<Animal> animals) {
        waitingAnimals.addAll(animals);
    }

    public Animal getFirst() {
        return waitingAnimals.getFirst();
    }

    public void removeFirst() {
        if (!waitingAnimals.isEmpty()) {
            waitingAnimals.removeFirst();
        }
    }

    public void removeFromList(Animal animal) {
        if (!waitingAnimals.isEmpty()) {
            waitingAnimals.remove(animal);
        }
    }

    public boolean inList(Animal animal) {
        return waitingAnimals.contains(animal);
    }

    public boolean isEmpty() {
        return waitingAnimals.isEmpty();
    }
}
