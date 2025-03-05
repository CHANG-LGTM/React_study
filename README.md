🚗 Car Database

Car Database 프로젝트는 Spring Boot 기반의 백엔드(cardatabase)와 React + Vite 기반의 프론트엔드(carfront)로 구성된 애플리케이션입니다. 사용자가 자동차 정보를 검색하고 관리할 수 있도록 설계되었습니다.

🛠 기술 스택

백엔드 (cardatabase)

Java 17

Spring Boot

Gradle

H2 Database (또는 PostgreSQL)

Spring Security (인증 및 권한 관리)

프론트엔드 (carfront)

React + Vite

TypeScript

CSS Modules

Axios (API 요청)

React Testing Library + Jest (테스트)

🚀 설치 및 실행 방법

1️⃣ 백엔드 실행 (Spring Boot)

cd cardatabase
./gradlew bootRun

기본적으로 http://localhost:8080 에서 API가 실행됩니다.

2️⃣ 프론트엔드 실행 (React + Vite)

cd carfront
npm install  # 의존성 설치
npm run dev  # 개발 서버 실행

기본적으로 http://localhost:5173 에서 프론트엔드가 실행됩니다.

🎯 주요 기능

✅ 자동차 목록 조회
✅ 자동차 상세 정보 보기
✅ 새로운 자동차 등록
✅ 자동차 정보 수정 및 삭제
✅ 사용자 인증 및 권한 관리

📸 스크린샷

📌 (예시 이미지 추가 가능)

🤝 기여 방법

이 레포지토리를 포크합니다.

새로운 브랜치를 생성합니다. (feature/새로운기능)

변경 사항을 커밋합니다. (git commit -m "Add 새로운 기능")

푸시 후 Pull Request를 생성합니다.

📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자유롭게 수정 및 배포가 가능합니다.
