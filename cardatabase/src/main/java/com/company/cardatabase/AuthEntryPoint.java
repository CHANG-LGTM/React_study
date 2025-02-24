package com.company.cardatabase;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

// 인증되지 않은 요청에 대해 처리하는 커스텀 AuthenticationEntryPoint 구현
@Component
public class AuthEntryPoint implements AuthenticationEntryPoint {

    // 인증 실패 시 호출되는 메서드
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        // HTTP 상태를 401 Unauthorized로 설정
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // 응답의 Content-Type을 application/json으로 설정
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // 클라이언트에게 전달할 인증 오류 메시지 작성
        PrintWriter writer = response.getWriter();
        writer.println("Error: " + authException.getMessage());
    }
}
