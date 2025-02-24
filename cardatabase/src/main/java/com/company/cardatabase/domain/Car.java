package com.company.cardatabase.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 자동차(Car) 엔티티 클래스 정의
@Entity
@Getter
@NoArgsConstructor
public class Car {

    // 자동차 객체를 생성할 때 사용하는 생성자
    public Car(String brand, String model, String color, String registrationNumber,
               int modelYear, int price, Owner owner) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.registrationNumber = registrationNumber;
        this.modelYear = modelYear;
        this.price = price;
        this.owner = owner;
    }

    // 자동차의 고유 식별자 (기본 키)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 자동차 브랜드, 모델, 색상, 등록번호
    private String brand, model, color, registrationNumber;

    // 제조 연도와 가격
    private int modelYear, price;

    // 자동차의 소유자 정보 (다대일 관계 설정)
    // 지연 로딩(LAZY) 방식으로 연관 관계 설정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner")
    private Owner owner;

    // 브랜드 변경 메서드
    public void setBrand(String brand) {
        this.brand = brand;
    }

    // 모델 변경 메서드
    public void setModel(String model) {
        this.model = model;
    }

    // 색상 변경 메서드
    public void setColor(String color) {
        this.color = color;
    }

    // 등록번호 변경 메서드
    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    // 제조 연도 변경 메서드
    public void setModelYear(int modelYear) {
        this.modelYear = modelYear;
    }

    // 가격 변경 메서드
    public void setPrice(int price) {
        this.price = price;
    }

    // 소유자 변경 메서드
    public void setOwner(Owner owner) {
        this.owner = owner;
    }
}