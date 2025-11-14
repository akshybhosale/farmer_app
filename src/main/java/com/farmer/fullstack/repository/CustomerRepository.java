//package com.farmer.fullstack.repository;
//
//import com.farmer.fullstack.model.Customer;
//
//import java.util.Optional;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface CustomerRepository extends JpaRepository<Customer, Long> { 
//	 Optional<Customer> findByEmailAndPassword(String email, String password);
//}

package com.farmer.fullstack.repository;

import com.farmer.fullstack.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);
}
