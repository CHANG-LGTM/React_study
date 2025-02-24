package com.company.cardatabase.repository;

import com.company.cardatabase.domain.AppUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

// 사용자 데이터 접근을 위한 리포지토리 인터페이스
// REST API로 노출되지 않도록 설정 (exported = false)
@RepositoryRestResource(exported = false)
public interface AppUserRepository extends CrudRepository<AppUser, Long> {

    // 사용자명을 기반으로 사용자 정보를 찾는 메서드
    Optional<AppUser> findByUsername(String username);

}