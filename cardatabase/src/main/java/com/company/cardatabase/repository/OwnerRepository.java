package com.company.cardatabase.repository;

import com.company.cardatabase.domain.Owner;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

// 자동차 소유자 데이터 접근을 위한 리포지토리 인터페이스
public interface OwnerRepository extends CrudRepository<Owner, Long> {

    // 소유자의 이름(firstname)을 기반으로 소유자 정보를 찾는 메서드
    Optional<Owner> findByFirstname(String firstName);
}