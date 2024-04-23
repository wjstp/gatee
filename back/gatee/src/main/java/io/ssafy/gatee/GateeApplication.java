package io.ssafy.gatee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GateeApplication {

	public static void main(String[] args) {
		SpringApplication.run(GateeApplication.class, args);
	}

}
