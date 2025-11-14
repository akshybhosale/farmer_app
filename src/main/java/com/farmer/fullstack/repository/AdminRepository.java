package com.farmer.fullstack.repository;

import com.farmer.fullstack.model.Admin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

//public interface AdminRepository extends JpaRepository<Admin, Long> { 
//	 Optional<Admin> findByEmailAndPassword(String email, String password);
//}

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}
