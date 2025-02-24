package com.company.cardatabase.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// OpenAPI (Swagger) 설정 클래스
@Configuration
public class OpenApiConfig {

    // OpenAPI 문서를 구성하는 빈(bean) 정의
    @Bean
    public OpenAPI carDatabaseOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Car REST API")          // API 문서의 제목 설정
                        .description("My car stock")    // API에 대한 간단한 설명
                        .version("1.0"));               // API 버전 정보
    }
}