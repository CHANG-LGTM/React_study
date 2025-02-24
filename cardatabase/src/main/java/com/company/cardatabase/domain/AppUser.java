package com.company.cardatabase.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 사용자(AppUser) 엔티티 클래스 정의
@Entity
@Getter
@Setter
@NoArgsConstructor
public class AppUser {

    // AppUser 객체 생성 시 사용되는 생성자
    public AppUser(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // 사용자의 고유 식별자 (기본 키)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 사용자명 (중복 불가능, null 불가능)
    @Column(nullable = false, unique = true)
    private String username;

    // 사용자 비밀번호 (null 불가능)
    @Column(nullable = false)
    private String password;

    // 사용자 역할 (예: USER, ADMIN 등, null 불가능)
    @Column(nullable = false)
    private String role;
}
