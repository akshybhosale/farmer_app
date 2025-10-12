package com.farmer.fullstack.repository;

import com.farmer.fullstack.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Long> { }
