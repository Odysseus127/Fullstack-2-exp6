package com.example.pagination_api.repository;

import com.example.pagination_api.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier,Long>{
    
} 
