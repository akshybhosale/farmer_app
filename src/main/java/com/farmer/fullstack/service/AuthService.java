package com.farmer.fullstack.service;

import com.farmer.fullstack.model.*;
import com.farmer.fullstack.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AdminRepository adminRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User register(User user) {
    	System.out.println("regi>>>" + user);

        // Encrypt password and save
        user.setPassword_dummy(user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        System.out.println("✅ USER REGISTERED: " + savedUser);

        // Role-based insertion
        String role = user.getRole();
        if ("Farmer".equalsIgnoreCase(role)) {
            Farmer farmer = new Farmer();
            farmer.setUserId(savedUser.getId());
            farmer.setFname(savedUser.getFname());
            farmer.setLname(savedUser.getLname());
            farmer.setEmail(savedUser.getEmail());
            farmer.setMobile(savedUser.getMobile());
            farmer.setPlace(savedUser.getPlace());
            farmer.setRole(savedUser.getRole());
            farmerRepository.save(farmer);

        } else if ("Customer".equalsIgnoreCase(role)) {
            Customer customer = new Customer();
            customer.setUserId(savedUser.getId());
            customer.setFname(savedUser.getFname());
            customer.setLname(savedUser.getLname());
            customer.setEmail(savedUser.getEmail());
            customer.setMobile(savedUser.getMobile());
            customer.setPlace(savedUser.getPlace());
            customer.setRole(savedUser.getRole());
            customer.setPassword(savedUser.getPassword());
            customerRepository.save(customer);

        } else if ("Admin".equalsIgnoreCase(role)) {
            Admin admin = new Admin();
            admin.setUserId(savedUser.getId());
            admin.setFname(savedUser.getFname());
            admin.setLname(savedUser.getLname());
            admin.setEmail(savedUser.getEmail());
            admin.setMobile(savedUser.getMobile());
            admin.setPlace(savedUser.getPlace());
            adminRepository.save(admin);
        }

        return savedUser;
    }

    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }
    
    

    public boolean isUserExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
