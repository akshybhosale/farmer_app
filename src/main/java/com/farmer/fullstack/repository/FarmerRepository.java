package com.farmer.fullstack.repository;

import com.farmer.fullstack.model.Farmer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

//public interface FarmerRepository extends JpaRepository<Farmer, Long> {
//    Optional<Farmer> findByEmailAndPassword(String email, String password);
//
//}

public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    Optional<Farmer> findByEmail(String email);
}
