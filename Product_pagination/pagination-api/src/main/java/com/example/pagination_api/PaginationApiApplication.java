package com.example.pagination_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PaginationApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaginationApiApplication.class, args);
	}

}
