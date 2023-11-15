package com.zoo.zoo.repository;

import com.zoo.zoo.model.Animal;
import com.zoo.zoo.model.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AreaRepository extends JpaRepository<Area, Long> {
    @Query("SELECT p.id as id, p.first as first, p.second as second, " +
            "(SELECT COUNT(a) FROM Area a " +
            " WHERE (a.pair.first = :animal OR a.pair.second = :animal) " +
            "   AND a.pair = p) as count " +
            "FROM Pair p " +
            "WHERE (p.first = :animal OR p.second = :animal)" +
            "ORDER BY 4 DESC")
    List<List<Object>> findPairsByAnimal(@Param("animal") Animal animal);
    @Query("SELECT COUNT(a) FROM Area a " +
            " WHERE (a.first = :animal OR a.second = :animal) AND a.pair IS NOT NULL")
    Integer countAllPairsByAnimal(@Param("animal") Animal animal);

    void deleteByFirstOrSecond(Animal first, Animal second);
}
