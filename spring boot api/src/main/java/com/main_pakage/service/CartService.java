package com.main_pakage.service;

import com.main_pakage.exception.ProductException;
import com.main_pakage.modal.Cart;
import com.main_pakage.modal.CartItem;
import com.main_pakage.modal.User;
import com.main_pakage.request.AddItemRequest;

public interface CartService {
	
	public Cart createCart(User user);
	
	public CartItem addCartItem(Long userId,AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);

}
