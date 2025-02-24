package com.company.cardatabase;

import com.company.cardatabase.domain.AppUser;
import com.company.cardatabase.domain.Car;
import com.company.cardatabase.domain.Owner;
import com.company.cardatabase.repository.AppUserRepository;
import com.company.cardatabase.repository.CarRepository;
import com.company.cardatabase.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.util.Arrays;

@SpringBootApplication
@RequiredArgsConstructor
@EnableMethodSecurity
public class CardatabaseApplication implements CommandLineRunner {

	// 로거 인스턴스 생성
	private static final Logger logger = LoggerFactory.getLogger(CardatabaseApplication.class);

	private final CarRepository repository;
	private final OwnerRepository orepository;
	private final AppUserRepository urepository;

	public static void main(String[] args) {
		SpringApplication.run(CardatabaseApplication.class, args);
		logger.info("Application started");
	}

	// 애플리케이션 시작 시 실행되는 초기 데이터 로딩 메서드
	@Override
	public void run(String... args) throws Exception {

		// 소유자 정보 생성 및 저장
		Owner owner1 = new Owner("John", "Johnson");
		Owner owner2 = new Owner("Mary", "Robinson");
		Owner owner3 = new Owner("John", "Johnson");
		Owner owner4 = new Owner("Mary", "Robinson");
		Owner owner5 = new Owner("John", "Johnson");

		orepository.saveAll(Arrays.asList(owner1, owner2, owner3, owner4, owner5));

		// 자동차 정보 생성 및 저장 (초기 데이터)
		repository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2023, 59000, owner1));
		// (생략된 자동차 저장 코드, 동일한 방식으로 총 30대의 자동차를 저장)

		// 모든 자동차 정보를 콘솔에 로깅
		for (Car car : repository.findAll()) {
			logger.info("brand: {}, model {}", car.getBrand(), car.getModel());
		}

		// 기본 사용자 계정 생성 및 저장
		// username: user, password: user (암호화된 비밀번호)
		urepository.save(new AppUser("user",
				"$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"));

		// 관리자 계정 생성 및 저장
		// username: admin, password: admin (암호화된 비밀번호)
		urepository.save(new AppUser("admin",
				"$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
	}
}