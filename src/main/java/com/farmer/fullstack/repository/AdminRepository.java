package com.farmer.fullstack.repository;

import com.farmer.fullstack.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> { }
