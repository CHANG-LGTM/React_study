// 서버에서 반환하는 자동차 데이터 타입 정의
export type CarResponse = {
    brand: string;               // 자동차 브랜드
    model: string;               // 자동차 모델
    color: string;               // 자동차 색상
    registrationNumber: string;  // 등록번호
    modelYear: number;           // 제조 연도
    price: number;               // 가격
    _links: {                    // 관련된 API 링크
        self: {                  // 자기 자신을 가리키는 링크
            href: string;
        }, 
        car: {                   // 자동차 자원을 가리키는 링크
            href: string;
        },
        owner: {                 // 소유자를 가리키는 링크
            href: string;
        }
    };
}

// 클라이언트에서 자동차 정보 입력 및 수정에 사용되는 자동차 데이터 타입
export type Car = {
    brand: string;               // 자동차 브랜드
    model: string;               // 자동차 모델
    color: string;               // 자동차 색상
    registrationNumber: string;  // 등록번호
    modelYear: number;           // 제조 연도
    price: number;               // 가격
}

// 자동차 데이터와 API URL을 묶어서 전달하는 타입 (주로 수정 시 사용)
export type CarEntry = {
    car: Car;                    // 자동차 정보 객체
    url: string;                 // 자동차 리소스 URL
}