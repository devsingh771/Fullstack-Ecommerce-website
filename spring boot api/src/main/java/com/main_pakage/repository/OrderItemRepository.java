package com.main_pakage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main_pakage.modal.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
