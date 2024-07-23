package com.main_pakage.service;

import java.util.List;

import com.main_pakage.exception.ProductException;
import com.main_pakage.modal.Rating;
import com.main_pakage.modal.User;
import com.main_pakage.request.RatingRequest;

public interface RatingServices {
	
	public Rating createRating(RatingRequest req,User user) throws ProductException;
	
	public List<Rating> getProductsRating(Long productId);

}
