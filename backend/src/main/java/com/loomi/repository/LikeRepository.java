package com.loomi.repository;

import com.loomi.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface LikeRepository extends JpaRepository<Like, Long> {

    List<Like> findByFromProfileId(Long fromProfileId);
    boolean existsByFromProfileIdAndToProfileId(Long from, Long to);
}
