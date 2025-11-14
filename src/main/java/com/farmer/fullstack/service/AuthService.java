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

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // ✅ use the Spring-managed bean

    // ✅ REGISTER USER
    public User register(User user) {
        System.out.println("regi>>> " + user);

        // Encode password
        user.setPassword_dummy(user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        System.out.println("✅ USER REGISTERED: " + savedUser);

        // Insert role-specific record
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
            farmer.setPassword(savedUser.getPassword()); // ✅ save encoded password
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
            customer.setPassword(savedUser.getPassword()); // ✅ save encoded password
            customerRepository.save(customer);

        } else if ("Admin".equalsIgnoreCase(role)) {
            Admin admin = new Admin();
            admin.setUserId(savedUser.getId());
            admin.setFname(savedUser.getFname());
            admin.setLname(savedUser.getLname());
            admin.setEmail(savedUser.getEmail());
            admin.setMobile(savedUser.getMobile());
            admin.setPlace(savedUser.getPlace());
            admin.setRole(savedUser.getRole());
            admin.setPassword(savedUser.getPassword()); // ✅ ensure encoded password saved
            adminRepository.save(admin);
        }

        return savedUser;
    }

    // ✅ LOGIN FOR ADMIN
    public Optional<Admin> loginAdmin(String email, String password) {
        Optional<Admin> opt = adminRepository.findByEmail(email);
        if (opt.isPresent() && passwordEncoder.matches(password, opt.get().getPassword())) {
            return opt;
        }
        return Optional.empty();
    }

    // ✅ LOGIN FOR CUSTOMER
    public Optional<Customer> loginCustomer(String email, String password) {
        Optional<Customer> opt = customerRepository.findByEmail(email);
        if (opt.isPresent() && passwordEncoder.matches(password, opt.get().getPassword())) {
            return opt;
        }
        return Optional.empty();
    }

    // ✅ LOGIN FOR FARMER
    public Optional<Farmer> loginFarmer(String email, String password) {
        Optional<Farmer> opt = farmerRepository.findByEmail(email);
        if (opt.isPresent() && passwordEncoder.matches(password, opt.get().getPassword())) {
            return opt;
        }
        return Optional.empty();
    }

    // ✅ CHECK USER EXISTS
    public boolean isUserExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
