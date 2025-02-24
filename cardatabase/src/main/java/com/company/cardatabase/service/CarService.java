package com.company.cardatabase.service;

import com.company.cardatabase.domain.Car;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

// 자동차 관련 서비스 클래스 (보안 권한 설정 포함)
@Service
public class CarService {

    // 자동차 정보를 수정할 수 있는 권한 설정 (USER 역할 필요)
    @PreAuthorize("hasRole('USER')")
    public void updateCar(Car car) {
        // 자동차 업데이트 로직 구현
    }

    // 자동차 정보를 삭제할 수 있는 권한 설정 (ADMIN 역할 필요)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCar(Car car) {
        // 자동차 삭제 로직 구현
    }
}
