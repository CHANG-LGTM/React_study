import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./component/Login";

// react-query에서 사용할 QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// 앱의 최상위 컴포넌트
function App() {
  return (
    // 최대 너비가 'xl'인 Container 내에 콘텐츠를 배치
    <Container maxWidth="xl">
      {/* 기본 CSS를 적용하여 브라우저 간 일관된 스타일 제공 */}
      <CssBaseline />

      {/* 상단 앱바(AppBar) 구성 */}
      <AppBar position="static">
        <Toolbar>
          {/* 앱바 제목 텍스트 */}
          <Typography variant="h6">
            CarShop
          </Typography>
        </Toolbar>
      </AppBar>

      {/* react-query를 사용할 컴포넌트 영역 정의 */}
      <QueryClientProvider client={queryClient}>
        {/* 사용자 인증을 위한 로그인 컴포넌트 렌더링 */}
        <Login />
      </QueryClientProvider>
    </Container>
  );
}

export default App;