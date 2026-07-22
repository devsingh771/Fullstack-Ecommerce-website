package com.main_pakage.service;

import java.util.List;

import com.main_pakage.exception.UserException;
import com.main_pakage.modal.User;

public interface UserService {
	
	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
	public List<User> findAllUsers();

}
