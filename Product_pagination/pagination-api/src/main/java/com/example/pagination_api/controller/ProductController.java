package com.example.pagination_api.controller;

import com.example.pagination_api.model.Product;
import com.example.pagination_api.service.ProductService;
import com.example.pagination_api.dto.PageResponse;
import com.example.pagination_api.dto.ErrorResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
     private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        // Validate page
        if (page < 0) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Page number cannot be negative."));
        }

        // Validate page size
        if (size < 1 || size > 60) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Page size must be between 1 and 60."));
        }

        // Validate sorting field
        if (!sortBy.equals("id") &&
            !sortBy.equals("name") &&
            !sortBy.equals("category") &&
            !sortBy.equals("price")) {

            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Invalid sort field. Use id, name, category, or price."));
        }

        // Validate sorting direction
        if (!direction.equalsIgnoreCase("asc") &&
            !direction.equalsIgnoreCase("desc")) {

            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Sort direction must be asc or desc."));
        }

        Sort.Direction sortDirection =
                direction.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        PageRequest pageable =
                PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        Page<Product> result = productService.getAllProducts(pageable);

        PageResponse<Product> response = new PageResponse<>(
                result.getContent(),
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages(),
                result.isFirst(),
                result.isLast()
        );

        return ResponseEntity.ok(response);
    }
}
