//package com.user_manager.userservice.services;
//
//
//import com.user_manager.userservice.models.Address;
//import com.user_manager.userservice.repositories.AddressRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class AddressService {
//
//    @Autowired
//    private AddressRepository addressRepository;
//
//    public List<Address> findAllAddresses() {
//        return this.addressRepository.findAll();
//    }
//
//    public void deleteAddress(Long id){
//        this.addressRepository.deleteById(id);
//    }
//
//
//
//}