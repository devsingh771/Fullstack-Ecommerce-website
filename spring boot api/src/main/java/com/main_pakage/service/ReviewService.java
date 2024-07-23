package com.main_pakage.service;

import java.util.List;

import com.main_pakage.exception.ProductException;
import com.main_pakage.modal.Review;
import com.main_pakage.modal.User;
import com.main_pakage.request.ReviewRequest;

public interface ReviewService {

	public Review createReview(ReviewRequest req,User user) throws ProductException;
	
	public List<Review> getAllReview(Long productId);
	
	
}
