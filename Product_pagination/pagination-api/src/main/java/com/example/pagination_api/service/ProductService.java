package com.example.pagination_api.service;

import com.example.pagination_api.model.Product;
import com.example.pagination_api.repository.ProductRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
//import org.springframework.cache.annotation.Cacheable;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /*@Cacheable(
        value="products",
        key="#pageable.pageNumber + '-' + #pageable.pageSize + '-' + #pageable.sort"
    )*/
    @Transactional(readOnly = true)
    public Page<Product> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findAllWithSupplier(pageable);

        // Access supplier for every product
        products.getContent().forEach(product -> {
            if (product.getSupplier() != null) {
                System.out.println(
                    "Product: " + product.getName()
                    + " | Supplier: "
                    + product.getSupplier().getName()
                );
            }
        });
        return products;
    }
    
}
