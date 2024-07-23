package com.main_pakage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main_pakage.modal.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
