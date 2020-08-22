package com.event_manager.eventservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class EventserviceApplication {
	public static void main(String[] args) {
		SpringApplication.run(EventserviceApplication.class, args);
	}
}
