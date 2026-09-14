package com.example.pagination_api.repository;

import com.example.pagination_api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query(
    value = """
        SELECT p
        FROM Product p
        JOIN FETCH p.supplier
        """,
    countQuery = """
        SELECT COUNT(p)
        FROM Product p
        """
    )
    Page<Product> findAllWithSupplier(Pageable pageable);
}
