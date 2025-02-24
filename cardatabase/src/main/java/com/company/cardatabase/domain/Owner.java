package com.company.cardatabase.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

// 소유자(Owner) 엔티티 클래스 정의
@Entity
@NoArgsConstructor
@Getter
// 지연 로딩 관련 Hibernate 프록시 객체를 JSON 직렬화에서 제외
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Owner {

    // 소유자 객체를 생성할 때 사용하는 생성자
    public Owner(String firstname, String lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    // 소유자 식별자 (기본 키)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ownerid;

    // 소유자의 이름과 성
    private String firstname, lastname;

    // 소유자가 보유한 자동차 목록 (One-to-Many 관계 설정)
    // 양방향 매핑에서 owner 필드를 사용하여 관계 설정
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "owner")
    private List<Car> cars;

    // 이름 변경 메서드
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    // 성 변경 메서드
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    // 소유 자동차 목록 설정 메서드
    public void setCars(List<Car> cars) {
        this.cars = cars;
    }
}