package com.main_pakage.service;

import com.main_pakage.exception.CartItemException;
import com.main_pakage.exception.UserException;
import com.main_pakage.modal.Cart;
import com.main_pakage.modal.CartItem;
import com.main_pakage.modal.Product;

public interface CartItemService {
	
	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Long userId, Long id,CartItem cartItem) throws CartItemException, UserException;
	
	public CartItem isCartItemExist(Cart cart,Product product,String size, Long userId);
	
	public void removeCartItem(Long userId,Long cartItemId) throws CartItemException, UserException;
	
	public CartItem findCartItemById(Long cartItemId) throws CartItemException;
	
}
