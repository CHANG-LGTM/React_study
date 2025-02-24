import { useState } from "react";
import axios from "axios";
import { Button, Snackbar, Stack, TextField } from "@mui/material";
import Carlist from "./Carlist";

// 사용자 인증 정보를 담는 타입 정의
// username: 사용자 아이디
// password: 사용자 비밀번호

type User = {
    username: string;
    password: string;
}

// 로그인 컴포넌트
function Login() {
    // 사용자 입력 상태 관리
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });

    // 사용자 인증 여부 상태 관리
    const [isAuthenticated, setAuth] = useState(false);

    // 로그인 실패 시 Snackbar 표시 상태 관리
    const [open, setOpen] = useState(false);

    // 로그인 요청 처리 함수
    const handleLogin = () => {
        axios.post(import.meta.env.VITE_API_URL + "/login", user, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                const jwtToken = res.headers.authorization;
                if (jwtToken !== null) {
                    // 인증 성공 시 JWT 토큰을 세션 스토리지에 저장
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                }
            })
            .catch(() => setOpen(true)); // 로그인 실패 시 Snackbar 열기
    }

    // 로그아웃 처리 함수
    const handleLogout = () => {
        setAuth(false);
        sessionStorage.setItem("jwt", ""); // JWT 토큰 제거
    }

    // 입력 필드 값 변경 처리 함수
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    // 인증된 상태라면 자동차 목록을 표시
    if (isAuthenticated) {
        return <Carlist logOut={handleLogout} />;
    }

    // 로그인 폼을 렌더링
    return (
        <Stack spacing={2} alignItems="center" mt={2}>
            {/* 사용자 아이디 입력 필드 */}
            <TextField
                name="username"
                label="Username"
                onChange={handleChange} />

            {/* 사용자 비밀번호 입력 필드 */}
            <TextField
                type="password"
                name="password"
                label="password"
                onChange={handleChange} />

            {/* 로그인 버튼 */}
            <Button
                variant="outlined"
                color="primary"
                onClick={handleLogin}>
                Login
            </Button>

            {/* 로그인 실패 시 표시되는 Snackbar 알림 */}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Login failed: Check your username and password" />
        </Stack>
    );
}

export default Login;
