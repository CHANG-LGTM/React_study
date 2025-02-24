package com.company.cardatabase.service;

import com.company.cardatabase.domain.AppUser;
import com.company.cardatabase.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

// 스프링 시큐리티에서 사용자 인증 시 사용자 정보를 로드하는 서비스 구현
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AppUserRepository repository;

    // 주어진 사용자명으로 사용자 정보를 로드하는 메서드
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<AppUser> user = repository.findByUsername(username);

        // 사용자 정보가 존재할 경우 UserDetails 객체 생성
        User.UserBuilder builder;
        if (user.isPresent()) {
            AppUser currentUser = user.get();
            builder = User.withUsername(username)
                    .password(currentUser.getPassword())
                    .roles(currentUser.getRole());
        } else {
            // 사용자 정보가 존재하지 않을 경우 예외 발생
            throw new UsernameNotFoundException("User not found");
        }

        // 생성된 UserDetails 객체 반환
        return builder.build();
    }
}