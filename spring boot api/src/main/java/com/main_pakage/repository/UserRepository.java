package com.main_pakage.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main_pakage.modal.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);
	
	public List<User> findAllByOrderByCreatedAtDesc();

}
